import { MeUseCaseOutput } from "./output"
import { MeRepository } from "~/domain/me"
import { Email, Password } from "~/domain/shared"
import { TrackingRepository } from "~/domain/tracking/repository"
import { MeUseCaseInput } from "~/usecase/me/input"

export class MeInteractor implements MeUseCaseInput {
  constructor(
    private readonly repository: MeRepository,
    private readonly trackingRepository: TrackingRepository,
    private readonly presenter: MeUseCaseOutput
  ) {}

  private async loginWithEmailVerify(): Promise<Error | null> {
    const res = await this.repository.login()
    if (res.isErr) {
      return res.error
    }
    this.presenter.set(res.value)
    this.trackingRepository.setUser(res.value)

    if (res.value.emailNotVerified) {
      const sendEmailVerificationRes = await this.repository.sendEmailVerification()
      if (sendEmailVerificationRes.isErr) {
        return sendEmailVerificationRes.error
      }
    }
    return null
  }

  async login(email: Email, password: Password): Promise<Error | null> {
    const fbRes = await this.repository.signInWithEmailAndPassword(email, password)
    if (fbRes.isErr) {
      return fbRes.error
    }
    await this.loginWithEmailVerify()
    return null
  }

  async signOut(): Promise<Error | null> {
    const res = await this.repository.signOut()
    if (res.isErr) {
      return res.error
    }
    this.presenter.clear()
    return null
  }

  async find(): Promise<Error | null> {
    const res = await this.repository.find()
    if (res.isErr) {
      return res.error
    }
    this.presenter.set(res.value)
    const setUserRes = this.trackingRepository.setUser(res.value)
    if (setUserRes.isErr) {
      return setUserRes.error
    }
    return null
  }
}

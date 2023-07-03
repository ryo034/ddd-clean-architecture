import { Result } from "true-myth"
import { Me } from "~/domain/me"
import { MeRepository } from "~/domain/me/repository"
import { Email } from "~/domain/shared"
import { Password } from "~/domain/shared"
import { FirebaseDriver } from "~/driver/firebase/driver"
import { MeDriver } from "~/driver/me/driver"
import { PromiseResult } from "~/infrastructure/shared/result"
import { MeGatewayAdapter } from "~/interface/gateway/me/adapter"

export class MeGateway implements MeRepository {
  constructor(
    private readonly driver: MeDriver,
    private readonly fbDriver: FirebaseDriver,
    private readonly adapter: MeGatewayAdapter
  ) {}

  async login(): PromiseResult<Me, Error> {
    const res = await this.driver.login()
    if (res.isErr) {
      return Result.err(res.error)
    }
    return this.adapter.adapt(res.value.me)
  }

  async sendEmailVerification(): PromiseResult<null, Error> {
    const res = await this.fbDriver.sendEmailVerification()
    if (res.isErr) {
      return Result.err(res.error)
    }
    return Result.ok(null)
  }

  async signOut(): PromiseResult<null, Error> {
    return this.fbDriver.signOut()
  }

  async signInWithEmailAndPassword(email: Email, password: Password): PromiseResult<null, Error> {
    const res = await this.fbDriver.signInWithEmailAndPassword(email, password)
    if (res.isErr) {
      return Result.err(res.error)
    }
    return Result.ok(null)
  }

  async find(): PromiseResult<Me, Error> {
    const res = await this.driver.find()
    if (res.isErr) {
      return Result.err(res.error)
    }
    return this.adapter.adapt(res.value.me)
  }
}

import { Result } from "true-myth"
import { Me } from "~/domain/me"
import { MeRepository } from "~/domain/me/repository"
import { Email } from "~/domain/shared"
import { Password } from "~/domain/shared"
import { FirebaseDriver } from "~/driver/firebase/driver"
import { FirebaseCurrentUserNotFoundError } from "~/infrastructure/error/firebase"
import { PromiseResult } from "~/infrastructure/shared/result"
import { MeGatewayAdapter } from "~/interface/gateway/me/adapter"

export class MeGateway implements MeRepository {
  constructor(private readonly fbDriver: FirebaseDriver, private readonly adapter: MeGatewayAdapter) {}

  async login(): PromiseResult<Me, Error> {
    if (this.fbDriver.currentUser === null) {
      return Result.err(new Error("user is not logged in"))
    }
    return this.adapter.adaptFirebaseUser(this.fbDriver.currentUser)
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

  async reloadAuth(): PromiseResult<Me, Error> {
    await this.fbDriver.reload()
    const cu = this.fbDriver.currentUser
    if (cu === null) {
      return Result.err(new FirebaseCurrentUserNotFoundError("currentUser is null"))
    }
    return this.adapter.adaptFirebaseUser(cu)
  }

  async signInWithEmailAndPassword(email: Email, password: Password): PromiseResult<null, Error> {
    const res = await this.fbDriver.signInWithEmailAndPassword(email, password)
    if (res.isErr) {
      return Result.err(res.error)
    }
    return Result.ok(null)
  }

  async find(): PromiseResult<Me, Error> {
    if (this.fbDriver.currentUser === null) {
      return Result.err(new Error("user is not logged in"))
    }
    return this.adapter.adaptFirebaseUser(this.fbDriver.currentUser)
  }
}

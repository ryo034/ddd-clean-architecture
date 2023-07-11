import { Result } from "true-myth"
import { Me } from "../../../domain/me"
import { MeRepository } from "../../../domain/me"
import { Email } from "../../../domain/shared"
import { Password } from "../../../domain/shared"
import { PromiseResult } from "../../../infrastructure/shared/result"
import { MeGatewayAdapter } from "../../../interface/gateway/me/adapter"
import { AuthProviderCurrentUserNotFoundError } from "../../../infrastructure"
import { AuthProviderDriver } from "../../../driver"

export class MeGateway implements MeRepository {
  constructor(private readonly apDriver: AuthProviderDriver, private readonly adapter: MeGatewayAdapter) {}

  async login(): PromiseResult<Me, Error> {
    if (this.apDriver.currentUser === null) {
      return Result.err(new Error("user is not logged in"))
    }
    return this.adapter.adaptAuthProviderUser(this.apDriver.currentUser)
  }

  async sendEmailVerification(): PromiseResult<null, Error> {
    const res = await this.apDriver.sendEmailVerification()
    if (res.isErr) {
      return Result.err(res.error)
    }
    return Result.ok(null)
  }

  async signOut(): PromiseResult<null, Error> {
    return this.apDriver.signOut()
  }

  async reloadAuth(): PromiseResult<Me, Error> {
    await this.apDriver.reload()
    const cu = this.apDriver.currentUser
    if (cu === null) {
      return Result.err(new AuthProviderCurrentUserNotFoundError("currentUser is null"))
    }
    return this.adapter.adaptAuthProviderUser(cu)
  }

  async signInWithEmailAndPassword(email: Email, password: Password): PromiseResult<null, Error> {
    const res = await this.apDriver.signInWithEmailAndPassword(email, password)
    if (res.isErr) {
      return Result.err(res.error)
    }
    return Result.ok(null)
  }

  async find(): PromiseResult<Me, Error> {
    if (this.apDriver.currentUser === null) {
      return Result.err(new Error("user is not logged in"))
    }
    return this.adapter.adaptAuthProviderUser(this.apDriver.currentUser)
  }
}

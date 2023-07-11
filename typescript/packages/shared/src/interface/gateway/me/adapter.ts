import { Result } from "true-myth"
import { AccountId, AccountName } from "../../../domain/account"
import { Me } from "../../../domain/me"
import { Email } from "../../../domain/shared"
import { User } from "../../../domain/user"
import { AdapterError, AuthProviderCurrentUserNotFoundError } from "../../../infrastructure"
import { AuthProviderUser } from "../../../driver"

export class MeGatewayAdapter {
  adaptAuthProviderUser(v: Partial<AuthProviderUser>): Result<Me, Error> {
    if (v.uid === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptAuthProviderUser.name, "v.uid is required"))
      return Result.err(new AuthProviderCurrentUserNotFoundError("User is not found"))
    }
    const id = AccountId.fromString(v.uid)
    if (id.isErr) {
      return Result.err(id.error)
    }

    if (v.displayName === null || v.displayName === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptAuthProviderUser.name, "v.displayName is required"))
      return Result.err(new AuthProviderCurrentUserNotFoundError("User is not found"))
    }
    const name = AccountName.create(v.displayName)
    if (name.isErr) {
      return Result.err(name.error)
    }

    if (v.email === null || v.email === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptAuthProviderUser.name, "v.email is required"))
      return Result.err(new AuthProviderCurrentUserNotFoundError("User is not found"))
    }
    const email = Email.create(v.email)
    if (email.isErr) {
      return Result.err(email.error)
    }
    const user = User.create({ id: id.value, name: name.value, email: email.value })
    return Result.ok(Me.create({ user, emailVerified: !!v.emailVerified }))
  }
}

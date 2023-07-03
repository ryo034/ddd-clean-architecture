import { User } from "firebase/auth"
import { Result } from "true-myth"
import { AccountId, AccountName } from "~/domain/account"
import { Me } from "~/domain/me"
import { Email } from "~/domain/shared"
import { User as DomainUser } from "~/domain/user"

export class MeGatewayAdapter {
  adaptFirebaseUser(v: User): Result<Me, Error> {
    const id = AccountId.fromString(v.uid)
    if (id.isErr) {
      return Result.err(id.error)
    }

    if (v.displayName === null) {
      return Result.err(new Error("Display name is not found"))
    }
    const name = AccountName.create(v.displayName)
    if (name.isErr) {
      return Result.err(name.error)
    }

    if (v.email === null) {
      return Result.err(new Error("Email is not found"))
    }
    const email = Email.create(v.email)
    if (email.isErr) {
      return Result.err(email.error)
    }
    const user = DomainUser.create({ id: id.value, name: name.value, email: email.value })
    return Result.ok(Me.create({ user, emailVerified: v.emailVerified }))
  }
}

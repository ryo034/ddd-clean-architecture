import { User } from "firebase/auth"
import { Result } from "true-myth"
import { AccountId, AccountName } from "../../../domain/account"
import { Me } from "../../../domain/me"
import { Email } from "../../../domain/shared"
import { User as DomainUser } from "../../../domain/user"
import { AdapterError, FirebaseCurrentUserNotFoundError } from "../../../infrastructure"

export class MeGatewayAdapter {
  adaptFirebaseUser(v: Partial<User>): Result<Me, Error> {
    if (v.uid === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptFirebaseUser.name, "v.uid is required"))
      return Result.err(new FirebaseCurrentUserNotFoundError("User is not found"))
    }
    const id = AccountId.fromString(v.uid)
    if (id.isErr) {
      return Result.err(id.error)
    }

    if (v.displayName === null || v.displayName === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptFirebaseUser.name, "v.displayName is required"))
      return Result.err(new FirebaseCurrentUserNotFoundError("User is not found"))
    }
    const name = AccountName.create(v.displayName)
    if (name.isErr) {
      return Result.err(name.error)
    }

    if (v.email === null || v.email === undefined) {
      console.error(new AdapterError(MeGatewayAdapter.name, this.adaptFirebaseUser.name, "v.email is required"))
      return Result.err(new FirebaseCurrentUserNotFoundError("User is not found"))
    }
    const email = Email.create(v.email)
    if (email.isErr) {
      return Result.err(email.error)
    }
    const user = DomainUser.create({ id: id.value, name: name.value, email: email.value })
    return Result.ok(Me.create({ user, emailVerified: !!v.emailVerified }))
  }
}

import { Result } from "true-myth"
import { AccountId, AccountName } from "~/domain/account"
import { Me } from "~/domain/me"
import { Email } from "~/domain/shared"
import { User } from "~/domain/user"
import { MeResponse } from "~/driver/me/driver"

export class MeGatewayAdapter {
  adapt(v: MeResponse): Result<Me, Error> {
    const id = AccountId.fromString(v.id)
    if (id.isErr) {
      return Result.err(id.error)
    }

    const name = AccountName.create(v.name)
    if (name.isErr) {
      return Result.err(name.error)
    }

    const email = Email.create(v.email)
    if (email.isErr) {
      return Result.err(email.error)
    }

    const user = User.create({
      id: id.value,
      name: name.value,
      email: email.value
    })
    return Result.ok(
      Me.create({
        user,
        emailVerified: v.emailVerified
      })
    )
  }
}

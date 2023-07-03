import { AccountId, AccountName } from "~/domain/account"
import { Email, Entity } from "~/domain/shared"

interface Props {
  id: AccountId
  name: AccountName
  email: Email
}

export class User extends Entity<Props> {
  static create(v: Props): User {
    return new User(v)
  }

  get id(): AccountId {
    return this.value.id
  }

  get name(): AccountName {
    return this.value.name
  }

  get email(): Email {
    return this.value.email
  }
}

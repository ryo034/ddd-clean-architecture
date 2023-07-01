import { AccountId, AccountName } from "~/domain/account"
import { Email, Entity, PhoneNumber } from "~/domain/shared"

interface Props {
  id: AccountId
  firstName: AccountName
  lastName: AccountName
  email: Email
  phoneNumber: PhoneNumber | null
}

export class User extends Entity<Props> {
  static create(v: Props): User {
    return new User(v)
  }

  get id(): AccountId {
    return this.value.id
  }

  get firstName(): AccountName {
    return this.value.firstName
  }

  get lastName(): AccountName {
    return this.value.lastName
  }

  get name(): string {
    return `${this.lastName.value} ${this.firstName.value}`
  }

  get email(): Email {
    return this.value.email
  }

  get phoneNumber(): PhoneNumber | null {
    return this.value.phoneNumber
  }
}

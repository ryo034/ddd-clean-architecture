import { AccountId, AccountName } from "~/domain/account"
import { Entity } from "~/domain/shared"

interface Props {
  id: AccountId
  name: AccountName
}

export class Account extends Entity<Props> {
  static create(v: Props): Account {
    return new Account(v)
  }

  get id(): AccountId {
    return this.value.id
  }

  get name(): AccountName {
    return this.value.name
  }
}

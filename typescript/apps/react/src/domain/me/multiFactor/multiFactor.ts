import { Entity, PhoneNumber } from "~/domain/shared"

interface Props {
  phoneNumber: PhoneNumber
}

export class MultiFactor extends Entity<Props> {
  static create(v: Props): MultiFactor {
    return new MultiFactor(v)
  }

  get phoneNumber(): PhoneNumber {
    return this.value.phoneNumber
  }
}

import { MultiFactor } from "~/domain/me/multiFactor"
import { Entity } from "~/domain/shared"
import { User } from "~/domain/user"

interface Props {
  user: User
  emailVerified: boolean
  multiFactor: MultiFactor | null
}

export class Me extends Entity<Props> {
  static create(v: Props): Me {
    return new Me(v)
  }

  get user(): User {
    return this.value.user
  }

  get emailVerified(): boolean {
    return this.value.emailVerified
  }

  get multiFactor(): MultiFactor | null {
    return this.value.multiFactor
  }

  get notEmailVerified(): boolean {
    return !this.emailVerified
  }

  get hasMultiFactor(): boolean {
    return this.multiFactor !== null
  }

  get hasNotTwoFactor(): boolean {
    return !this.hasMultiFactor
  }
}

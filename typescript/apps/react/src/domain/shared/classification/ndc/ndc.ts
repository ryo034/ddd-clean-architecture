import { ValueObject } from "~/domain/shared"
import { NDCCode, NDCEdition, NDCName } from "~/domain/shared/classification/ndc"

interface Props {
  code: NDCCode
  name: NDCName
  edition: NDCEdition
}

export class NDC extends ValueObject<Props> {
  static create(v: Props): NDC {
    return new NDC(v)
  }

  get code(): NDCCode {
    return this.value.code
  }

  get name(): NDCName {
    return this.value.name
  }

  get edition(): NDCEdition {
    return this.value.edition
  }
}

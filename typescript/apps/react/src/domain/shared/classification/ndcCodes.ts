import { Entities } from "~/domain/shared"
import { NDCCode } from "~/domain/shared/classification/ndc/code"

export class NDCCodes extends Entities<NDCCode> {
  static create(vs: NDCCode[]): NDCCodes {
    return new NDCCodes(vs)
  }
  static empty(): NDCCodes {
    return new NDCCodes([])
  }
}

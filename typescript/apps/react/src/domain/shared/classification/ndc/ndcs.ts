import { NDC } from "./ndc"
import { Entities } from "~/domain/shared"

export class NDCs extends Entities<NDC> {
  static create(vs: NDC[]): NDCs {
    return new NDCs(vs)
  }
  static empty(): NDCs {
    return new NDCs([])
  }
}

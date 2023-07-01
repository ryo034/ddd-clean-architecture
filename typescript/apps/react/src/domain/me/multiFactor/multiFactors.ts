import { MultiFactor } from "~/domain/me/multiFactor"
import { Entities } from "~/domain/shared"

export class MultiFactors extends Entities<MultiFactor> {
  static create(vs: MultiFactor[]): MultiFactors {
    return new MultiFactors(vs)
  }
  static empty(): MultiFactors {
    return new MultiFactors([])
  }
}

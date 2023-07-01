import { Result } from "true-myth"
import { ValueObject } from "~/domain/shared"

export class NDCCode extends ValueObject<string> {
  static pattern = /^\d{3}$/

  static create(v: string): Result<NDCCode, Error> {
    if (!NDCCode.pattern.test(v)) {
      return Result.err(new Error(`NDCCode must match ${NDCCode.pattern}: ${v}`))
    }
    return Result.ok(new NDCCode(v))
  }
}

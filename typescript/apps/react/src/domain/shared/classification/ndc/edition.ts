import { Result } from "true-myth"
import { ValueObject } from "~/domain/shared"

export class NDCEdition extends ValueObject<number> {
  static editions = [9, 10]

  static create(v: number): Result<NDCEdition, Error> {
    if (!NDCEdition.editions.includes(v)) {
      return Result.err(new Error(`NDCEdition is invalid: ${v.toString()}`))
    }
    return Result.ok(new NDCEdition(v))
  }
}

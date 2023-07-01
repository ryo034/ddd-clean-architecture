import { Result } from "true-myth"
import { ValueObject } from "~/domain/shared"

export class NDCName extends ValueObject<string> {
  static create(v: string): Result<NDCName, Error> {
    if (v === "") {
      return Result.err(new Error("NDCName is invalid"))
    }
    return Result.ok(new NDCName(v))
  }
}

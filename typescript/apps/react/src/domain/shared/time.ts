import { Result } from "true-myth"
import { DomainError, ValueObject, domainKeys } from "~/domain/shared"

export class AppTime extends ValueObject<Date> {
  static create(v: Date): AppTime {
    return new AppTime(v)
  }

  static fromString(v: string): Result<AppTime, Error> {
    if (!v) {
      return Result.err(
        new DomainError({
          domainKey: domainKeys.AppTime,
          value: v,
          message: "AppTime is required"
        })
      )
    }
    return Result.ok(new AppTime(new Date(v)))
  }

  get localeTimeString(): string {
    return this.value.toLocaleString("ja-JP")
  }
}

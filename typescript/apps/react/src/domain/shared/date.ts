import { Result } from "true-myth"
import { DomainError, ValueObject, domainKeys } from "~/domain/shared"

export class AppDate extends ValueObject<Date> {
  static create(v: Date): AppDate {
    return new AppDate(v)
  }

  static now(): AppDate {
    return new AppDate(new Date(Date.now()))
  }

  static fromString(v: string): Result<AppDate, Error> {
    if (!v) {
      return Result.err(new DomainError({ domainKey: domainKeys.AppDate, value: v }))
    }
    return Result.ok(new AppDate(new Date(v)))
  }

  get localeDateString(): string {
    return this.value.toLocaleDateString("ja-JP")
  }

  get jpString(): string {
    const year = this.value.getFullYear()
    const month = this.value.getMonth() + 1
    const day = this.value.getDate()
    return `${year}年${Number(month.toString().padStart(2, "0"))}月${Number(day.toString().padStart(2, "0"))}日`
  }

  get hyphenString(): string | undefined {
    return this.value.toISOString().split("T")[0]
  }
}

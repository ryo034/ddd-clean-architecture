import { Result } from "true-myth"
import { DomainError, ValueObject, domainKeys } from "~/domain/shared"

export class AccountName extends ValueObject<string> {
  // 漢字/ひらがな/カタカナ/半角文字
  static pattern = /^[ぁ-んァ-ン一-龥a-zA-Z]+$/
  static max = 50
  static create(v: string): Result<AccountName, Error> {
    if (v.length > this.max) {
      return Result.err(
        new DomainError({
          domainKey: domainKeys.AccountName,
          value: v,
          message: `Account name must be less than ${this.max} characters`
        })
      )
    }
    if (!this.pattern.test(v)) {
      return Result.err(
        new DomainError({
          domainKey: domainKeys.AccountName,
          value: v,
          message: "Account name must be in Japanese or English"
        })
      )
    }
    return Result.ok(new AccountName(v))
  }
}

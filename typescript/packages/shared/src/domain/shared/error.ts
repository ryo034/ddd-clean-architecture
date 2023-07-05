export const domainKeys = {
  Password: "Password",
  Email: "Email",
  AccountName: "AccountName",
  StringId: "StringId"
} as const

type DomainKeyTypes = keyof typeof domainKeys

interface DomainErrorProps<T> {
  domainKey: DomainKeyTypes
  value: T
  message?: string
}

export class DomainError<T> extends Error {
  domainKey: DomainKeyTypes
  value: T
  constructor(v: DomainErrorProps<T>) {
    const msg = v.message ?? `Invalid ${v.domainKey} value: ${v.value}`
    super(msg)
    this.name = "DomainError"
    this.domainKey = v.domainKey
    this.value = v.value
  }
}

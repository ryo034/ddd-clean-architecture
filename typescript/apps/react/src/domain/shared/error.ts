export const domainKeys = {
  AppTime: "AppTime",
  MFAAuthCode: "MFAAuthCode",
  Password: "Password",
  AddressZipCode: "AddressZipCode",
  AddressStreet: "AddressStreet",
  AddressCity: "AddressCity",
  AddressCountry: "AddressCountry",
  AddressBuilding: "AddressBuilding",
  AddressPrefecture: "AddressPrefecture",
  Email: "Email",
  OrganizationName: "OrganizationName",
  AccountName: "AccountName",
  AccountGender: "AccountGender",
  StaffRole: "StaffRole",
  ReferenceInquiry: "ReferenceInquiry",
  ReferenceContactMethod: "ReferenceContactMethod",
  ReferenceOpenRange: "ReferenceOpenRange",
  OrganizationCategory: "OrganizationCategory",
  ReferenceSurveyClassificationTitle: "ReferenceSurveyClassificationTitle",
  ReferenceVersion: "ReferenceVersion",
  LibraryType: "LibraryType",
  LibraryCategory: "LibraryCategory",
  AccountProfession: "AccountProfession",
  BookPage: "BookPage",
  PhoneNumber: "PhoneNumber",
  AppDateTime: "AppDateTime",
  AppDate: "AppDate",
  StringId: "StringId",
  ItemPrice: "ItemPrice",
  ItemName: "ItemName",
  ItemDetail: "ItemDetail"
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

export class AlreadyOrderedItemError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this)
    }
  }
}

export class DuplicateCancelOrderError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this)
    }
  }
}

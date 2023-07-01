import { SearchAddress } from "./search"
import { AddressZipCode } from "./zipCode"
import { PromiseResult } from "~/infrastructure/shared/result"

export interface AddressRepository {
  searchByZipCode(zipCode: AddressZipCode): PromiseResult<SearchAddress, Error>
}

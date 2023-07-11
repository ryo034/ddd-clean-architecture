import { FirebaseErrorAdapter } from "./firebase"
import { FirebaseError } from "firebase/app"
import { AdapterError, DomainError, EnvHandler } from "shared"

export class UnknownError extends Error {}

export class ErrorHandler extends Error {
  static adapt(err: unknown): Error {
    if (EnvHandler.isLocal()) {
      // ここでログが出力されてない場合はadapterのエラーの可能性が高い
      console.error(err)
    }
    // let isCaptureError = false
    let error: Error
    if (err instanceof FirebaseError) {
      error = FirebaseErrorAdapter.create(err)
    } else if (err instanceof DomainError) {
      error = err
    } else if (err instanceof Error) {
      error = err
    } else if (err instanceof AdapterError) {
      error = err
    } else if (typeof err === "string") {
      error = new UnknownError(err)
    } else {
      error = new UnknownError("unknown error")
    }

    if (EnvHandler.isLocal()) {
      console.error(error)
    }
    return error
  }
}

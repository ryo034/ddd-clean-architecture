import { AdapterError } from "./adapter"
import { FirebaseErrorAdapter } from "./firebase"
import { captureException } from "@sentry/react"
import { FirebaseError } from "firebase/app"
import { DomainError } from "~/domain/shared"
import { EnvHandler } from "~/infrastructure/env/handler"

export class UnknownError extends Error {}

export class ErrorHandler extends Error {
  static adapt(err: unknown): Error {
    if (EnvHandler.isLocal()) {
      // ここでログが出力されてない場合はadapterのエラーの可能性が高い
      console.error(err)
    }
    let isCaptureError = false
    let error: Error
    if (err instanceof FirebaseError) {
      error = FirebaseErrorAdapter.create(err)
      isCaptureError = true
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

    if (isCaptureError) {
      captureException(err, {})
    }

    if (EnvHandler.isLocal()) {
      console.error(error)
    }
    return error
  }
}

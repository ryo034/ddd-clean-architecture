import { InternalServerError } from "./network"
import { HttpStatusCode } from "./statusCode"
import { FirebaseError } from "firebase/app"

export class FirebaseCustomError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this)
    }
  }
}

export class FirebaseCurrentUserNotFoundError extends FirebaseCustomError {}
export class FirebaseNotFoundCurrentLibraryIdInCustomClaims extends FirebaseCustomError {}

export class FirebaseAuthMissingEmail extends FirebaseCustomError {}
export class FirebaseAuthUserNotFoundError extends FirebaseCustomError {}
export class FirebaseAuthInvalidPhoneNumberError extends FirebaseCustomError {}
export class FirebaseAuthWrongPasswordError extends FirebaseCustomError {}
export class FirebaseAuthInvalidPasswordError extends FirebaseCustomError {}
export class FirebaseAuthEmailAlreadyInUseError extends FirebaseCustomError {}
export class FirebaseAuthIdTokenExpiredError extends FirebaseCustomError {}
export class FirebaseAuthIdTokenRevokedError extends FirebaseCustomError {}
export class FirebaseAuthUnverifiedEmailError extends FirebaseCustomError {}
export class FirebaseAuthInternalError extends FirebaseCustomError {}

const firebaseErrorCode = {
  missingEmailError: "auth/missing-email",
  invalidPhoneNumber: "auth/invalid-phone-number",
  userNotFoundError: "auth/user-not-found",
  invalidPasswordError: "auth/invalid-password",
  wrongPasswordError: "auth/wrong-password",
  emailAlreadyInUseError: "auth/email-already-in-use",
  idTokenExpiredError: "auth/id-token-expired",
  idTokenRevokedError: "auth/id-token-revoked",
  multiFactorAuthRequired: "auth/multi-factor-auth-required",
  unverifiedEmail: "auth/unverified-email"
}

export class FirebaseErrorAdapter {
  static create(err: FirebaseError): Error {
    switch (err.code) {
      case firebaseErrorCode.missingEmailError:
        return new FirebaseAuthMissingEmail("missing email")
      case firebaseErrorCode.invalidPhoneNumber:
        return new FirebaseAuthInvalidPhoneNumberError("invalid phone number")
      case firebaseErrorCode.userNotFoundError:
        return new FirebaseAuthUserNotFoundError("user not found")
      case firebaseErrorCode.invalidPasswordError:
        return new FirebaseAuthInvalidPasswordError("invalid password")
      case firebaseErrorCode.wrongPasswordError:
        return new FirebaseAuthWrongPasswordError("invalid password")
      case firebaseErrorCode.emailAlreadyInUseError:
        return new FirebaseAuthEmailAlreadyInUseError("email already in use")
      case firebaseErrorCode.idTokenExpiredError:
        return new FirebaseAuthIdTokenExpiredError("id token expired")
      case firebaseErrorCode.idTokenRevokedError:
        return new FirebaseAuthIdTokenRevokedError("id token revoked")
      case firebaseErrorCode.unverifiedEmail:
        return new FirebaseAuthUnverifiedEmailError("unverified email")
      default:
        return new InternalServerError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
    }
  }
}

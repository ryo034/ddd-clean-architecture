export { AdapterError } from './adapter'
export { AuthBaseError } from './auth'
export {
  FirebaseCustomError,
  FirebaseCurrentUserNotFoundError,
  FirebaseNotFoundCurrentLibraryIdInCustomClaims,
  FirebaseAuthMissingEmail,
  FirebaseAuthUserNotFoundError,
  FirebaseAuthInvalidPhoneNumberError,
  FirebaseAuthWrongPasswordError,
  FirebaseAuthInvalidPasswordError,
  FirebaseAuthEmailAlreadyInUseError,
  FirebaseAuthIdTokenExpiredError,
  FirebaseAuthIdTokenRevokedError,
  FirebaseAuthUnverifiedEmailError,
  FirebaseAuthInternalError,
  FirebaseErrorAdapter
} from './firebase'
export { UnknownError, ErrorHandler } from './handler'
export { errorMessageHandler } from './message'
export {
  NetworkBaseError,
  CannotConnectNetworkError,
  BadRequestError,
  ForbiddenError,
  AuthenticationError,
  NotFoundError,
  AlreadyExistError,
  InternalServerError,
  EmailAlreadyInUseError,
  InvalidEmailUseError,
  InvalidAddressError
} from './network'
export { HttpStatusCode } from './statusCode'

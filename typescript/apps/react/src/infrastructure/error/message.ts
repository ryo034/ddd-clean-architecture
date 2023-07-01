import {
  FirebaseAuthEmailAlreadyInUseError,
  FirebaseAuthIdTokenExpiredError,
  FirebaseAuthIdTokenRevokedError,
  FirebaseAuthInternalError,
  FirebaseAuthInvalidPasswordError,
  FirebaseAuthMissingEmail,
  FirebaseAuthUnverifiedEmailError,
  FirebaseAuthUserNotFoundError,
  FirebaseAuthWrongPasswordError,
  FirebaseCustomError
} from "~/infrastructure/error/firebase"
import {
  BadRequestError,
  EmailAlreadyInUseError,
  InvalidAddressError,
  InvalidEmailUseError,
  NetworkBaseError
} from "~/infrastructure/error/network"

const adaptNetworkError = (err: Error): string => {
  let msg = "不明なエラーが発生しました"
  if (err instanceof BadRequestError) {
    msg = "不正なリクエストです"
  } else if (err instanceof EmailAlreadyInUseError) {
    msg = "すでにそのメールアドレスは使用されています"
  } else if (err instanceof InvalidEmailUseError) {
    msg = "不正なメールアドレスです"
  } else if (err instanceof InvalidAddressError) {
    msg = "住所が正しくありません。正しい住所を入力して下さい"
  }
  return msg
}

const adaptFirebaseError = (err: FirebaseCustomError): string => {
  let msg = "不明なエラーが発生しました"
  if (err instanceof FirebaseAuthUserNotFoundError) {
    msg = "メールアドレスが見つかりません"
  } else if (err instanceof FirebaseAuthMissingEmail) {
    msg = "メールアドレスが見つかりません"
  } else if (err instanceof FirebaseAuthWrongPasswordError) {
    msg = "メールアドレスまたはパスワードが一致しません"
  } else if (err instanceof FirebaseAuthInvalidPasswordError) {
    msg = "メールアドレスまたはパスワードが一致しません"
  } else if (err instanceof FirebaseAuthEmailAlreadyInUseError) {
    msg = "すでにそのメールアドレスは使用されています"
  } else if (err instanceof FirebaseAuthIdTokenExpiredError) {
  } else if (err instanceof FirebaseAuthUnverifiedEmailError) {
    msg = "メールアドレスが認証されていません"
  } else if (err instanceof FirebaseAuthIdTokenRevokedError) {
  } else if (err instanceof FirebaseAuthInternalError) {
    msg = "サーバーでエラーが発生しました"
  } else {
  }
  return msg
}

export const errorMessageHandler = (err: Error) => {
  // const { i18n } = useContext(ContainerContext)
  if (err instanceof FirebaseCustomError) {
    return adaptFirebaseError(err)
  } else if (err instanceof NetworkBaseError) {
    return adaptNetworkError(err)
  } else {
    // return i18n.translate(`${i18nKeys.word.error.unknown}`)
    return ""
  }
}

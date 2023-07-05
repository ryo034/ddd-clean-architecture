import {
  Auth,
  User,
  UserCredential,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { Result } from "true-myth"
import { Email } from "../../domain/shared"
import { Password } from "../../domain/shared"
import { FirebaseCurrentUserNotFoundError } from "../../infrastructure/error/firebase"
import { ErrorHandler } from "../../infrastructure/error/handler"
import { PromiseResult } from "../../infrastructure/shared/result"

export class FirebaseDriver {
  constructor(private readonly client: Auth) {}

  get getClient(): Auth {
    return this.client
  }

  get currentUser(): User | null {
    return this.client.currentUser
  }

  async signInWithEmailAndPassword(email: Email, password: Password): PromiseResult<UserCredential, Error> {
    try {
      const res = await signInWithEmailAndPassword(this.client, email.value, password.value)
      return Result.ok(res)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  async sendEmailVerification(): PromiseResult<null, Error> {
    if (this.client.currentUser === null) {
      return Result.err(new FirebaseCurrentUserNotFoundError("currentUser is null"))
    }
    try {
      await sendEmailVerification(this.client.currentUser)
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  async reload(): PromiseResult<null, Error> {
    try {
      if (this.currentUser === null) {
        return Result.err(new FirebaseCurrentUserNotFoundError("currentUser is null"))
      }
      await reload(this.currentUser)
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  async signOut(): PromiseResult<null, Error> {
    try {
      await signOut(this.client)
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }
}

import { setUser } from "@sentry/react"
import { Result } from "true-myth"
import { Me } from "~/domain/me"
import { ErrorHandler } from "~/infrastructure/error/handler"

export class SentryDriver {
  setUser(me: Me): Result<null, Error> {
    try {
      setUser({
        id: me.user.id.value.asString,
        email: me.user.email.value,
        username: me.user.name
      })
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }
}

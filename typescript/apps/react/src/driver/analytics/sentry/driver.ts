import { setUser } from "@sentry/react"
import { ErrorHandler, Me } from "shared"
import { Result } from "true-myth"

export class SentryDriver {
  setUser(me: Me): Result<null, Error> {
    try {
      setUser({
        id: me.user.id.value.asString,
        email: me.user.email.value,
        username: me.user.name.value
      })
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }
}

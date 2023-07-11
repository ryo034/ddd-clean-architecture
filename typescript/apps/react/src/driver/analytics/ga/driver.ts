import { Me } from "shared"
import { Result } from "true-myth"
import { MyCustomGA } from "~/infrastructure/analytics/ga"
import { ErrorHandler } from "~/infrastructure/error/handler"

export class GoogleAnalyticsDriver {
  constructor(private readonly client: MyCustomGA) {}

  initialize(): void {
    this.client.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)
  }

  sendUser(me: Me): Result<null, Error> {
    try {
      this.client.gtag("set", "user_properties", {
        user_id: me.user.id.value.asString
      })
      return Result.ok(null)
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  sendLocation(_page: string): void {
    this.client.gtag("event", "page_view", {})
  }
}

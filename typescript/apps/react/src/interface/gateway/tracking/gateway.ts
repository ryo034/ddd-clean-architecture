import { Result } from "true-myth"
import { Me } from "~/domain/me"
import { TrackingRepository } from "~/domain/tracking/repository"
import { GoogleAnalyticsDriver } from "~/driver/analytics/ga/driver"

export class TrackingGateway implements TrackingRepository {
  constructor(private readonly gaDriver: GoogleAnalyticsDriver) {}

  setUser(me: Me): Result<null, Error> {
    const gaSetUserRes = this.gaDriver.sendUser(me)
    if (gaSetUserRes.isErr) {
      return Result.err(gaSetUserRes.error)
    }
    return Result.ok(null)
  }
}

import { Result } from "true-myth"
import { Me } from "~/domain/me"

export interface TrackingRepository {
  setUser(me: Me): Result<null, Error>
}

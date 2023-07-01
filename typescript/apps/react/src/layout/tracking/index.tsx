import { FC } from "react"
import { Outlet } from "react-router-dom"
import { usePageTracking } from "~/infrastructure/analytics/ga"

type Props = {}

export const TrackingLayout: FC<Props> = () => {
  usePageTracking()
  return (
    <>
      <Outlet />
    </>
  )
}

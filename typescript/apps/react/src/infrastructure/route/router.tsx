import { FC, memo } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeMap } from "~/infrastructure/route/path"
import { ThemeLayout } from "~/layout/theme"
import { TrackingLayout } from "~/layout/tracking"
import { NotFoundPage } from "~/pages/error/notFound"
import { LoginPage } from "~/pages/login"

export const accountInitialPagePath = routeMap.account

const router = createBrowserRouter([
  {
    path: "/",
    element: <TrackingLayout />,
    children: [
      {
        element: <ThemeLayout />,
        children: [
          { path: routeMap.login, element: <LoginPage /> },
          { path: "*", element: <NotFoundPage /> }
        ]
      }
    ]
  }
])

export const Router: FC = memo(() => {
  return <RouterProvider router={router} />
})

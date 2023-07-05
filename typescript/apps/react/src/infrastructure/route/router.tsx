import { FC, memo } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeMap } from "~/infrastructure/route/path"
import { AuthLayout } from "~/layout/auth"
import { ThemeLayout } from "~/layout/theme"
import { TrackingLayout } from "~/layout/tracking"
import { AccountPage } from "~/pages/account"
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
          {
            element: <AuthLayout />,
            children: [
              { path: routeMap.login, element: <LoginPage /> },
              { path: routeMap.account, element: <AccountPage /> }
            ]
          },
          { path: "*", element: <NotFoundPage /> }
        ]
      }
    ]
  }
])

export const Router: FC = memo(() => {
  return <RouterProvider router={router} />
})

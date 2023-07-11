import { FC, useContext, useLayoutEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { firebaseAuth } from "~/infrastructure/firebase"
import { ContainerContext } from "~/infrastructure/injector/context"
import { routeMap, unauthenticatedRoutes, unprotectedInitialPagePath } from "~/infrastructure/route/path"

type Props = {}

export const AuthLayout: FC<Props> = () => {
  const { controller, store, driver } = useContext(ContainerContext)
  const location = useLocation()
  const navigate = useNavigate()
  const me = store.me((state) => state.me)
  const meRef = useRef(me)
  const [_, loading] = useAuthState(firebaseAuth)

  const isAuthenticatedRoute = unauthenticatedRoutes.includes(location.pathname)

  useLayoutEffect(() => {
    store.me.subscribe((state) => {
      if (state.me === null) {
        return
      }
      meRef.current = state.me

      if (driver.firebase.currentUser === null) {
        return
      }

      if (isAuthenticatedRoute) {
        navigate(routeMap.account)
        return
      }
    })

    const unsubscribed = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user === null) {
        if (isAuthenticatedRoute) {
          navigate(location)
          return
        }
        navigate(unprotectedInitialPagePath)
        return
      }
      await controller.me.find()
    })

    return () => unsubscribed()
  }, [])

  if (loading) {
    return <div />
  }

  return <Outlet />
}

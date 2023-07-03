import { useContext, useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import { ContainerContext } from "~/infrastructure/injector/context"

export const ProtectedLayout = () => {
  const { store, driver } = useContext(ContainerContext)
  const me = store.me((state) => state.me)
  const meRef = useRef(me)

  useEffect(() => {
    store.me.subscribe((state) => {
      meRef.current = state.me
    })
    const unsubscribed = driver.firebase.getClient.onAuthStateChanged(async (user) => {
      if (user === null) {
        return
      }
    })
    return () => {
      unsubscribed()
    }
  })

  return <Outlet />
}

import { FC, useContext, useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { ContainerContext } from "~/infrastructure/injector/context"

type Props = {}

export const ThemeLayout: FC<Props> = () => {
  const { store, controller } = useContext(ContainerContext)
  const isDark = store.theme((state) => state.isDark)

  useLayoutEffect(() => {
    controller.theme.init()
  }, [])

  return (
    <main className={`min-h-screen w-full bg-gray-50 dark:bg-gray-900 ${isDark && "dark"}`}>
      <Outlet />
    </main>
  )
}

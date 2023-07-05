import { FC, useContext, useEffect, useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import sandboxImage from "~/assets/sandbox.png"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { ContainerContext } from "~/infrastructure/injector/context"

type Props = {}

export const ThemeLayout: FC<Props> = () => {
  const { store, controller } = useContext(ContainerContext)
  const isDark = store.theme((state) => state.isDark)

  const onChangeTheme = () => {
    controller.theme.toggle(!isDark)
  }

  useLayoutEffect(() => {
    controller.theme.init()
  }, [])

  useEffect(() => {
    store.theme.subscribe((state) => {
      document.documentElement.classList.toggle("dark", state.isDark)
    })
  }, [])

  return (
    <>
      <header className="fixed top-0 w-full bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <nav className="">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center text-xl space-x-2 font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8" src={sandboxImage} alt="logo" />
              <span>Sandbox on Vite</span>
            </a>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Switch id="switchTheme" checked={isDark} onCheckedChange={onChangeTheme} />
              <Label htmlFor="switchTheme" className="cursor-pointer">
                Switch Theme
              </Label>
            </label>
          </div>
        </nav>
      </header>
      <main className={"min-h-screen w-full bg-gray-50 dark:bg-gray-900"}>
        <Outlet />
      </main>
    </>
  )
}

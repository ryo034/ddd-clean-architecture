import { FC, useContext, useLayoutEffect, useRef, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import sandboxImage from "~/assets/sandbox.png"
import { LoginFormValues, LoginPageForm } from "~/components/auth/login/form"
import { errorMessageHandler } from "~/infrastructure/error/message"
import { i18nKeys } from "~/infrastructure/i18n"
import { ContainerContext } from "~/infrastructure/injector/context"
import { accountInitialPagePath } from "~/infrastructure/route/router"

export const LoginPage: FC = () => {
  const { store, controller, i18n } = useContext(ContainerContext)
  const isDark = store.theme((s) => s.isDark)
  const me = store.me((state) => state.me)
  const meRef = useRef(me)

  const [errorMessage, setErrorMessage] = useState("")

  const onChangeTheme = () => {
    controller.theme.toggle(!isDark)
  }

  const navigate = useNavigate()

  useLayoutEffect(() => {
    store.me.subscribe((state) => {
      meRef.current = state.me
    })
  }, [])

  const onSubmit: SubmitHandler<LoginFormValues> = async (d) => {
    const res = await controller.me.login(d.email, d.password)
    if (res) {
      setErrorMessage(errorMessageHandler(res))
      return
    }
    navigate(accountInitialPagePath)
  }

  const onClickGoToSignUpPage = () => {
    console.log("onClickGoToSignUpPage")
  }

  const onClickForgotPassword = () => {
    console.log("onClickForgotPassword")
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background/95">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
            <img className="w-12 h-12 mr-2" src={sandboxImage} alt="logo" />
            Sandbox
          </a>

          <div className="mb-12">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isDark} onChange={onChangeTheme} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change Theme</span>
            </label>
          </div>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {i18n.translate(i18nKeys.page.login.signInYourAccount)}
              </h1>
              <LoginPageForm
                onClickGoToSignUpPage={onClickGoToSignUpPage}
                onClickForgotPassword={onClickForgotPassword}
                onSubmit={onSubmit}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

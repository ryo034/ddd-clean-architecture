import { FC, useContext, useLayoutEffect, useRef, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { errorMessageHandler } from "shared"
import { LoginFormValues, LoginPageForm } from "~/components/auth/login/form"
import { i18nKeys } from "~/infrastructure/i18n"
import { ContainerContext } from "~/infrastructure/injector/context"
import { accountInitialPagePath } from "~/infrastructure/route/router"

export const LoginPage: FC = () => {
  // console.log('process.env.VITE_FIREBASE_API_KEY', process.env.VITE_FIREBASE_API_KEY);
  const { store, controller, i18n } = useContext(ContainerContext)
  const me = store.me((state) => state.me)
  const meRef = useRef(me)

  const [errorMessage, setErrorMessage] = useState("")

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
    <div className="min-h-screen bg-gray-50 dark:bg-background/95">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
    </div>
  )
}

import { useLoginPageFormMessage } from "./message"
import { FC, useContext } from "react"
import { useForm } from "react-hook-form"
import sandboxImage from "~/assets/sandbox.png"
import { FormPasswordInputSection } from "~/components/common/form/inputPassword"
import { FormInputSection } from "~/components/common/form/inputSection"
import { Button } from "~/components/ui/button"
import { Email, Password } from "~/domain/shared"
import { i18nKeys } from "~/infrastructure/i18n"
import { ContainerContext } from "~/infrastructure/injector/context"

export type LoginFormValues = {
  email: string
  password: string
}

export const LoginPage: FC = () => {
  const { store, controller, i18n } = useContext(ContainerContext)
  const isDark = store.theme((s) => s.isDark)

  const onChangeTheme = () => {
    controller.theme.toggle(!isDark)
  }

  const {
    register,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const message = useLoginPageFormMessage()

  const emailInputField = register("email", {
    required: message.form.validation.email.required,
    maxLength: {
      value: Email.max,
      message: message.form.validation.email.max
    },
    pattern: {
      value: Email.pattern,
      message: message.form.validation.email.regex
    }
  })

  const passwordInputField = register("password", {
    required: message.form.validation.password.required,
    pattern: {
      value: Password.pattern,
      message: message.form.validation.password.regex
    }
  })

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
              <form className="space-y-4 md:space-y-6" action="#">
                <FormInputSection
                  fullWidth
                  title={i18n.translate(i18nKeys.word.email)}
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  reactHookForm={emailInputField}
                  errorMessage={errors.email?.message ?? ""}
                />
                <FormPasswordInputSection
                  fullWidth
                  isCurrent
                  title={i18n.translate(i18nKeys.word.password)}
                  id="password"
                  placeholder="••••••••"
                  autoComplete="password"
                  reactHookForm={passwordInputField}
                  errorMessage={errors.password?.message ?? ""}
                />
                <div className="flex items-center justify-end">
                  <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">
                    {i18n.translate(i18nKeys.page.login.forgotPassword)}
                  </a>
                </div>
                <Button fullWidth type="submit" form="loginForm" data-testid="loginButton">
                  {i18n.translate(i18nKeys.action.login)}
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {i18n.translate(i18nKeys.page.login.notHaveAnAccountYet)}{" "}
                  <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {i18n.translate(i18nKeys.action.signUp)}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

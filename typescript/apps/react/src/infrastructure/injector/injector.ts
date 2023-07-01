import ga4 from "react-ga4"
import { GoogleAnalyticsDriver } from "~/driver/analytics/ga/driver"
import { SentryDriver } from "~/driver/analytics/sentry/driver"
import { FirebaseDriver } from "~/driver/firebase/driver"
import { ThemeDriver } from "~/driver/theme/driver"
import { firebaseAuth } from "~/infrastructure/firebase"
import { ReactI18nextProvider } from "~/infrastructure/i18n"
import { ThemeController } from "~/interface/controller/theme/controller"
import { ThemePresenter } from "~/interface/presenter/theme/presenter"
import { meStore } from "~/store/me/store"
import { themeStore } from "~/store/theme/store"
import { ThemeInteractor } from "~/usecase/theme/interactor"

const setupStore = () => {
  return {
    me: meStore,
    theme: themeStore
  }
}

const store = setupStore()

const setupDriverAdapter = () => {
  return {}
}

const _driverAdapter = setupDriverAdapter()

const setupDriver = () => {
  const firebase = new FirebaseDriver(firebaseAuth)
  return {
    firebase,
    sentry: new SentryDriver(),
    ga: new GoogleAnalyticsDriver(ga4),
    theme: new ThemeDriver(localStorage)
  }
}

const driver = setupDriver()

const setupGatewayAdapter = () => {
  return {}
}
const _gatewayAdapter = setupGatewayAdapter()

const setupGateway = () => {
  return {}
}
const gateway = setupGateway()

const setupPresenter = () => {
  return {
    theme: new ThemePresenter(store.theme)
  }
}

const presenter = setupPresenter()

const setupUseCase = () => {
  return {
    theme: new ThemeInteractor(driver.theme, presenter.theme)
  }
}
const useCase = setupUseCase()

const setupController = () => {
  return {
    theme: new ThemeController(useCase.theme)
  }
}
const controller = setupController()

const i18n = new ReactI18nextProvider()

export const di = {
  driver,
  store,
  gateway,
  controller,
  i18n
}

export type DI = typeof di

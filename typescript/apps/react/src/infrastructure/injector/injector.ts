import ga4 from "react-ga4"
import { GoogleAnalyticsDriver } from "~/driver/analytics/ga/driver"
import { SentryDriver } from "~/driver/analytics/sentry/driver"
import { MePresenter } from "~/interface/presenter/me/presenter"
import { meStore } from "~/store/me/store"
import { ReactI18nextProvider } from "~/infrastructure/i18n"
import { ThemePresenter } from "~/interface/presenter/theme/presenter"
import { themeStore } from "~/store/theme/store"
import { firebaseAuth, FirebaseDriver, MeController, MeGateway, MeGatewayAdapter, MeInteractor, ThemeController, ThemeDriver, ThemeInteractor } from "shared"

const setupStore = () => {
  return {
    me: meStore,
    theme: themeStore
  }
}

const store = setupStore()

const ls = localStorage
const setupDriver = () => {
  const firebase = new FirebaseDriver(firebaseAuth)
  return {
    firebase,
    sentry: new SentryDriver(),
    ga: new GoogleAnalyticsDriver(ga4),
    theme: new ThemeDriver(ls)
  }
}

const driver = setupDriver()

const setupGatewayAdapter = () => {
  return {
    me: new MeGatewayAdapter()
  }
}

const gatewayAdapter = setupGatewayAdapter()

const setupGateway = () => {
  return {
    me: new MeGateway(driver.firebase, gatewayAdapter.me),
  }
}
const gateway = setupGateway()

const setupPresenter = () => {
  return {
    theme: new ThemePresenter(store.theme),
    me: new MePresenter(store.me)
  }
}

const presenter = setupPresenter()

const setupUseCase = () => {
  return {
    theme: new ThemeInteractor(driver.theme, presenter.theme),
    me: new MeInteractor(gateway.me, presenter.me)
  }
}
const useCase = setupUseCase()

const setupController = () => {
  return {
    theme: new ThemeController(useCase.theme),
    me: new MeController(useCase.me)
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

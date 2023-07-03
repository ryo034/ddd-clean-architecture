import axios from "axios"
import ga4 from "react-ga4"
import { GoogleAnalyticsDriver } from "~/driver/analytics/ga/driver"
import { SentryDriver } from "~/driver/analytics/sentry/driver"
import { FirebaseDriver } from "~/driver/firebase/driver"
import { ThemeDriver } from "~/driver/theme/driver"
import { firebaseAuth } from "~/infrastructure/firebase"
import { ReactI18nextProvider } from "~/infrastructure/i18n"
import { MeController } from "~/interface/controller/me/controller"
import { ThemeController } from "~/interface/controller/theme/controller"
import { MeGatewayAdapter } from "~/interface/gateway/me/adapter"
import { MeGateway } from "~/interface/gateway/me/gateway"
import { TrackingGateway } from "~/interface/gateway/tracking/gateway"
import { MePresenter } from "~/interface/presenter/me/presenter"
import { ThemePresenter } from "~/interface/presenter/theme/presenter"
import { meStore } from "~/store/me/store"
import { themeStore } from "~/store/theme/store"
import { MeInteractor } from "~/usecase/me/interactor"
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

const _apiClient = axios.create()

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
  return {
    me: new MeGatewayAdapter()
  }
}

const gatewayAdapter = setupGatewayAdapter()

const setupGateway = () => {
  return {
    me: new MeGateway(driver.firebase, gatewayAdapter.me),
    tracking: new TrackingGateway(driver.ga)
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
    me: new MeInteractor(gateway.me, gateway.tracking, presenter.me)
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

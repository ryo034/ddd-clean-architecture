export const routeMap = {
  login: "/",
  confirmEmail: "/confirm-email",
  account: "/account"
} as const

export const unauthenticatedRoutes = [routeMap.login.toString()]

export const authRoutes = [routeMap.account.toString(), routeMap.confirmEmail.toString()]

export const unprotectedInitialPagePath = routeMap.login

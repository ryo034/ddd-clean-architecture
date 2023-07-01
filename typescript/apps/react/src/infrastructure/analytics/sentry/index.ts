import { BrowserTracing, init } from "@sentry/react"

export const initializeSentry = () => {
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    environment: process.env.NODE_ENV,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    release: import.meta.env.VITE_RELEASE_TAG
  })
}

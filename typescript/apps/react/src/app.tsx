import { ErrorBoundary } from "@sentry/react"
import { ContainerProvider } from "~/infrastructure/provider"
import { Router } from "~/infrastructure/route/router"

export const App = () => {
  return (
    <>
      <ContainerProvider>
        <ErrorBoundary fallback={<p>error page</p>} showDialog={false}>
          <Router />
        </ErrorBoundary>
      </ContainerProvider>
    </>
  )
}

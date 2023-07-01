import { initI18n } from "./infrastructure/i18n/i18n"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "~/app"
import "~/styles/index.css"

initI18n()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

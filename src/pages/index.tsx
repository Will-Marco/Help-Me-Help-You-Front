import { lazy } from "react"
import LoginHome from "./auth/Home"
import Home from "./dashboard/Home"

const LoginTeacher = lazy(() =>
  new Promise((resolve: any) => {
    setTimeout(() => resolve(import("./auth/LoginTeacher")), 1500)
  })
)

const LoginAdmin = lazy(() =>
  new Promise((resolve: any) => {
    setTimeout(() => resolve(import("./auth/LoginAdmin")), 1500)
  })
)

export { LoginTeacher, LoginAdmin, Home, LoginHome }

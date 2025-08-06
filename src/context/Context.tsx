
import type { ContextType } from "@/types/Context.type"
import { createContext, useState, type FC, type ReactNode } from "react"
import { useCookies } from "react-cookie"

export const Context = createContext<ContextType>({
  token: "",
  setToken: () => null,
  showNavbar: false,
  setShowNavbar: () => false,
})

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [cookies, setCookie] = useCookies(['token'])
  const [token, setTokenState] = useState<string | null>(cookies.token || null)
  const [showNavbar, setShowNavbar] = useState<boolean>(false)

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken) {
      setCookie("token", newToken, { path: "/", maxAge: 60 * 60 * 24 }) // 1 kun
    }
  }

  return (
    <Context.Provider value={{ token, setToken, showNavbar, setShowNavbar }}>
      {children}
    </Context.Provider>
  )
}

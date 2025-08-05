import type { ReactNode } from "react"

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="h-[100vh] relative">
      {children}
      
    </div>
  )
}

export default DashboardLayout
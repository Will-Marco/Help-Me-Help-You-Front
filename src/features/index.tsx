import { useContext } from "react"
import Navbar from "../modules/Navbar"
import Header from "../modules/Header"
import DashboardRoutes from "@/routes/dashboard/DashboardRoutes"
import { Context } from "@/context/Context"

const DashboardLayout = () => {
  const {showNavbar} = useContext(Context)
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <div className={`${showNavbar ? "w-full" : "w-[82%]"} duration-300 flex flex-col h-full`}>
        <div className="flex-shrink-0">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardRoutes />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
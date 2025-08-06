import { useContext } from "react"
import Navbar from "../modules/Navbar"
import Header from "../modules/Header"
import DashboardRoutes from "@/routes/dashboard/DashboardRoutes"
import { Context } from "@/context/Context"

const DashboardLayout = () => {
  const {showNavbar} = useContext(Context)
  return (
    <div className="flex">
      <Navbar />
      <div className={` ${showNavbar ? "w-full" : "w-[82%]"} duration-300`}>
        <Header/>
        <DashboardRoutes />
      </div>
    </div>
  )
}

export default DashboardLayout
import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../../provider/DashboardLayout"
import Home from "@/pages/auth/Home"
import { Path } from "@/hooks/Path"

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path={Path.main} element={<Home />} />
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes
import type { DashboardRouteType } from "@/@types/DashboardRouteType"
import { StudentDashboardRouteList } from "@/hooks/Path"
import { Route, Routes } from "react-router-dom"

const StudentRoute = () => {
    return (
        <Routes>
            {StudentDashboardRouteList.map((item:DashboardRouteType) => <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    )
}

export default StudentRoute
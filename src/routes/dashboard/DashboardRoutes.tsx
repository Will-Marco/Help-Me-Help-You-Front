import { Route, Routes } from 'react-router-dom'
import type { DashboardRouteType } from '@/@types/DashboardRouteType'
import { DashboardRouteList } from '@/hooks/Path'

const DashboardRoutes = () => {
  return (
    <Routes>
        {DashboardRouteList.map((item:DashboardRouteType) => <Route key={item.id} path={item.path} element={item.element}/>)}
    </Routes>
  )
}

export default DashboardRoutes
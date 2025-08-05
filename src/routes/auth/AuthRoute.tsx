import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { Path } from "@/hooks/Path"
import { LoginTeacher, LoginAdmin, LoginHome } from "@/pages"
import PageLoading from "@/components/PageLoading"

const AuthRoute = () => {
  return (
    <Routes>
        <Route path={Path.main} element={<LoginHome/>}/>
        <Route path={Path.loginTeacher} element={<Suspense fallback={<PageLoading/>}><LoginTeacher/></Suspense>}/>
        <Route path={Path.loginAdmin} element={<Suspense fallback={<PageLoading/>}><LoginAdmin/></Suspense>}/>
    </Routes>
  )
}

export default AuthRoute
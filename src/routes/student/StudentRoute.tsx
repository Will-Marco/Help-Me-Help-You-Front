import { StudentPaths } from "@/hooks/Path"
import { StudentHome } from "@/pages/Student"
import { Route, Routes } from "react-router-dom"

const StudentRoute = () => {
    return (
        <Routes>
            <Route path={StudentPaths.studentHome} element={<StudentHome />} />
        </Routes>
    )
}

export default StudentRoute
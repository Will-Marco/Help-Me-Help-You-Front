import { useNavigate } from "react-router-dom"

import { useEffect } from "react"
import { Path } from "@/hooks/Path"

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(Path.loginTeacher)
    }, [])
    return ""
}

export default Home
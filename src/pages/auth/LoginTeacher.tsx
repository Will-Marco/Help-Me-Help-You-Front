import Loginform from "@/components/LoginForm"
import { Toaster } from "sonner"

const LoginTeacher = () => {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <Loginform />
      </div>
    </>
  )
}

export default LoginTeacher

import { useContext } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { Context } from "@/context/Context"
import { useNavigate } from "react-router-dom"

const Loginform = () => {
  const { setToken } = useContext(Context)
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    toast.info("Google orqali tizimga kirish bosildi!")
  }

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault()
    setToken("1234") 
    toast.success("Tizimga muvaffaqiyatli kirildi!")
    navigate("/teachers")
  }
  return (
    <form className="bg-white rounded-xl shadow-lg px-6 py-8 w-full max-w-md space-y-6 mx-auto">
      <h2 className="text-2xl font-bold text-center text-black">Tizimga kirish</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
          <Input
            className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#3ce6cf] transition-all"
            placeholder="Emailingizni kiriting..."
            type="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Parol</label>
          <Input
            className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#3ce6cf] transition-all"
            placeholder="Parolingizni kiriting..."
            type="password"
          />
        </div>
      </div>

      <Button
        className="w-full text-white font-semibold transition-colors duration-300 cursor-pointer"
        variant="default"
        type="submit"
        onClick={handleLoginClick}
      >
        Tizimga kirish
      </Button>

      <div className="relative flex items-center justify-center">
        <span className="absolute px-2 bg-white text-gray-400 text-sm">yoki</span>
        <div className="w-full h-px bg-gray-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-xl" />
        Google orqali kirish
      </Button>
    </form>
  )
}

export default Loginform

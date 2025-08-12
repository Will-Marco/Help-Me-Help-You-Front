import { useCookies } from "react-cookie";
import { Toaster } from "sonner";
import "./App.css";
import AuthRoute from "./routes/auth/AuthRoute";
import DashboardLayout from "./features";
// import { StudentHome } from "./pages/Student";

function App() {
  const [cookies] = useCookies(["token"]);

  return (
    <>
      {/* {cookies.token ? <StudentHome /> : <AuthRoute />} */}
      {cookies.token ? <DashboardLayout /> : <AuthRoute />}

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;

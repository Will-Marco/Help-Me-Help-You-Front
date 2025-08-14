import { useCookies } from "react-cookie";
import { Toaster } from "sonner";
import "./App.css";
import AuthRoute from "./routes/auth/AuthRoute";
// import DashboardLayout from "./features";
import StudentRoute from "./routes/student/StudentRoute";

function App() {
  const [cookies] = useCookies(["token"]);

  return (
    <>
      {cookies.token ? <StudentRoute /> : <AuthRoute />}
      {/* {cookies.token ? <DashboardLayout /> : <AuthRoute />} */}

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;

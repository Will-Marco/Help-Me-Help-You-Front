import { useCookies } from 'react-cookie';
import './App.css'
import AuthRoute from './routes/auth/AuthRoute';
// import DashboardLayout from './features';
import { StudentHome } from './pages/Student';

function App() {
  const [cookies] = useCookies(['token']);
  // return cookies.token ? <DashboardLayout /> : <AuthRoute />
  return cookies.token ? <StudentHome /> : <AuthRoute />;
}

export default App;
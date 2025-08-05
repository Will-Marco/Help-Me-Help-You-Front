import { useCookies } from 'react-cookie';
import './App.css'
import DashboardRoutes from './routes/dashboard/DashboardRoutes';
import AuthRoute from './routes/auth/AuthRoute';

function App() {
  const [cookies] = useCookies(['token']);
  return cookies.token ? <DashboardRoutes /> : <AuthRoute />
}

export default App;

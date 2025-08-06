import { useCookies } from 'react-cookie';
import './App.css'
import AuthRoute from './routes/auth/AuthRoute';
import DashboardLayout from './features';

function App() {
  const [cookies] = useCookies(['token']);
  return cookies.token ? <DashboardLayout /> : <AuthRoute />
}

export default App;
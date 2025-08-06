import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { GlobalContext } from './context/Context' // ✅ Joylashuvni tekshiring

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter>
      <GlobalContext>
        <App />
      </GlobalContext>
    </BrowserRouter>
  </CookiesProvider>
)

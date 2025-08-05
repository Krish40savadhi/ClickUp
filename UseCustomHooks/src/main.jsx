import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseToggle from './hooks/UseToggle.jsx'
import UseFetch from './hooks/UseFetch.jsx'
import UseLocalStorage from './hooks/UseLocalStorage.jsx'
import UsePrevious from './hooks/UsePrevious.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <UseToggle/> */}
    {/* <UseFetch/> */}
    {/* <UseLocalStorage/> */}
    <UsePrevious/>
  </StrictMode>,
)

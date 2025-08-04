import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseEff from './UseEffect.jsx'
import UseReduc from './UseReducer.jsx'
import UseRefdemo from './UseRef.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <UseEff /> */}
    {/* <UseReduc/> */}
    <UseRefdemo />
  </StrictMode>,
)

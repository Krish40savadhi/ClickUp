import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UseState from './UseState.jsx'
import UseEff from './UseEffect.jsx'
import UseReduc from './UseReducer.jsx'
import UseRefdemo from './UseRef.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <UseState/>            */}
    {/* <UseEff /> */}
    {/* <UseReduc/> */}
    <UseRefdemo />
  </StrictMode>,
)

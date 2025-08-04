import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StableFunctionReference from './StableFunctionReference.jsx'
import PassingStableCallbacks from './PassingStableCallbacks.jsx'
import Fetcher from './Example3.jsx'
import Throttling from './Example5.jsx'
import Debouncing from './Example4.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <StableFunctionReference /> */}
  {/* <PassingStableCallbacks /> */}
  {/* <Fetcher/> */}
  {/* <Debouncing/> */}
  <Throttling/>
  </StrictMode>,
)

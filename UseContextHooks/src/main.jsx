import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BasicContext from './BasicContext.jsx'
import DynamicValues from './DynamicValues.jsx'
import UpdateContext from './UpdateContext.jsx'
import NestedConext  from './NestedContext.jsx'
import DefaultContext from './DefaultContext.jsx'
import WithUseReducer from './WithUseReducer.jsx'
import WithCustomHook from './WithCustomHook.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <BasicContext /> */}
    {/* <DynamicValues/> */}
    {/* <UpdateContext/> */}
    {/* <NestedConext/> */}
    {/* <DefaultContext/> */}
    {/* <WithUseReducer/> */}
    <WithCustomHook/>
    
  </StrictMode>,
)

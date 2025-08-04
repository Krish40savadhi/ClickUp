import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CountMemo from './CountMemo';
import FactorialExample from './FactorialExample';
import FilterList from './FilterList';
import PreventChildRender from './PreventChildRender';
import ExpensiveSorting from './ExpensiveSorting';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <CountMemo/> */}
    {/* <FactorialExample/> */}
{/* <FilterList/> */}
{/* <PreventChildRender/> */}
{/* <ExpensiveSorting/> */}
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import OverView from './Components/OverView.jsx'
import Transaction from './Components/Transaction.jsx'
import Pots from './Components/Pots.jsx'
import RecurrBill from './Components/RecurrBill.jsx'
import Budgets from './Components/Budgets.jsx'

import App from './App.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>
      <Route path='' element = {<OverView/>}/>
      <Route path='Transactions' element={<Transaction/>}/>
      <Route path = 'Budgets' element = {<Budgets/>}/>
      <Route path = 'RecurringBills' element = {<RecurrBill/>}/>
      <Route path = 'Pots' element = {<Pots/>}/>



    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)

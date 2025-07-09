import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Outlet} from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './Components/SideBar.jsx'
import AppProvider from '../src/Context/AppContext.jsx'; 
function App() {
  return (
    <AppProvider>
      <div
    className='grid grid-cols-5'
    >
      <SideBar/>
      <Outlet/>
    </div>
    </AppProvider>
    
  )
}

export default App

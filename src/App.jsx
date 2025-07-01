import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Outlet} from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './Components/SideBar.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div
    className='grid grid-cols-5'
    >
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default App

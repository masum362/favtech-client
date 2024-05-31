import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div>Navbar</div>
      <Outlet />
      <div>Footer</div>
    </>
  )
}

export default App

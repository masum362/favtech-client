import { Outlet } from 'react-router-dom'
import Navbar from './shared/navbar/Navbar'
import Footer from './shared/footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

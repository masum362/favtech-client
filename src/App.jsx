import { Outlet } from 'react-router-dom'
import Navbar from './shared/navbar/Navbar'
import Footer from './shared/footer/Footer'

function App() {
  return (
    <>
      <div className='mx-2 md:mx-4 lg:mx-8 space-y-2'>
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    </>
  )
}

export default App

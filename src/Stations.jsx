import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function Stations() {
  return (
    <div>
      <Header />

      {/* STATIONS LIST */}
      <div className='Stations'>
      </div>

      {/* STATION CHAT */}
      <div className='Station'>
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Stations
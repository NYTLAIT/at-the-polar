import { Outlet } from 'react-router'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'



function Stations() {
  const [stations, setStations] = useState()

  return (
    <div>
      <Header />

      {/* STATIONS LIST */}
      <div className='Stations'>

        {stations.map()}
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
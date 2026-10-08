import { Outlet } from 'react-router'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

import { getStations } from './socket/clientEvents'

function Stations() {
  const [stations, setStations] = useState([])

  useEffect(() => getStations(setStations), [])

  return (
    <div>
      <Header />

      {/* STATIONS LIST */}
      <div className='Stations'>
        {stations.length === 0 && <p>No stations yet</p>}

        {stations.map((station) => (
          <button key={station.name}>{station.name}</button>
        ))}
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
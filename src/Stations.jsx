import { Outlet } from 'react-router'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import StationsThumbnail from './StationsThumbnail'

import { getStations } from './socket/clientEvents'
import { createStation } from './socket/clientEvents'

function Stations() {
  const [stations, setStations] = useState({
    role: null,
    allStations: [],
    subscribed: [],
    memberOf: []
  })
  useEffect(() => getStations(setStations), [])

  const memberOf = stations.memberOf
  const subscribed = stations.subscribed
  const other = stations.allStations.filter((station) =>
    stations.subscribed.includes(station))

  function handleStationCreation() {
    const stationName = window.prompt('Station name?')
    createStation(stationName, console.log)
  }

  return (
    <div>
      <Header />

      {/* ------ STATIONS LIST ----------- */}
      <div className='Stations'>
        {/* -- Allow researchers only to create new stations */}
        {stations.role === 'researcher' &&
          <button onClick={handleStationCreation}>+ New station</button>
        }
        {/* -- Handle if no stations yet */}
        {stations.length === 0 && <p>No stations yet</p>}

        {/* -- STATIONS */}
        <div className="stationsList">
          {/* Member of */}
          {memberOf.length > 0 && (
            <>
              <h4>MEMBER OF</h4>
              {memberOf.map(station =>
                <StationsThumbnail key={station} station={station} />
              )}
            </>
          )}
          {/* Subscribed */}
          {subscribed.length > 0 && (
            <>
              <h4>Subscribed</h4>
              {subscribed.map(station =>
                <StationsThumbnail key={station} station={station} />
              )}
            </>
          )}
          {/* Other */}
          {other.length > 0 && (
            <>
              <h4>All Stations</h4>
              {subscribed.map(station =>
                <StationsThumbnail key={station} station={station} />
              )}
            </>
          )}
        </div>
      </div>

      {/* ------ STATION CHAT ----------- */}
      <div className='Station'>
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Stations
import { Outlet } from 'react-router'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import StationsThumbnail from './StationsThumbnail'
import './App.css'

import { getStations, createStation } from 'at-the-polar-module'

function Stations() {
  const [stations, setStations] = useState({
    role: null,
    allStations: [],
    subscribed: [],
    memberOf: []
  })
  useEffect(() => getStations(setStations), [])

  const { memberOf, subscribed } = stations
  const other = stations.allStations.filter((station) =>
    !subscribed.includes(station) &&
    !memberOf.includes(station)
  )

  function handleStationCreation() {
    const stationName = window.prompt('Station name?')
    if (!stationName?.trim()) return
    createStation(stationName, console.log)
  }

  const renderStation = (station) => (
    <StationsThumbnail
      key={station}
      stationName={station}
      role={stations.role}
      isSubscribed={subscribed.includes(station)}
      isMember={memberOf.includes(station)}
    />
  )

  return (
    <div className='min-h-screen flex flex-col'>
      {/* <Header /> */}

      <div className="AppContainer flex flex-1">

        {/* ------ STATIONS LIST ----------- */}
        <div className='Stations list-panel'>
          {/* -- Allow researchers only to create new stations */}
          {stations.role === 'researcher' &&
            <button onClick={handleStationCreation}>+ New station</button>
          }
          {/* -- Handle if no stations yet */}
          {stations.allStations.length === 0 && <p>No stations yet</p>}

          {/* -- STATIONS */}
          <div className="stationsList">
            {/* Member of */}
            {memberOf.length > 0 && (
              <>
                <h4>MEMBER OF</h4>
                {memberOf.map(renderStation)}
              </>
            )}
            {/* Subscribed */}
            {subscribed.length > 0 && (
              <>
                <h4>SUBSCRIBED</h4>
                {subscribed.map(renderStation)}
              </>
            )}
            {/* Other */}
            {other.length > 0 && (
              <>
                <h4>ALL STATIONS</h4>
                {other.map(renderStation)}
              </>
            )}
          </div>
        </div>

        {/* ------ STATION CHAT ----------- */}
        <div className='Station chat-panel'>
          <Outlet context={stations} />
        </div>

      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default Stations
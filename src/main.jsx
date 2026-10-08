import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

import { isConnected } from './socket/clientEvents.js'

import Login from './Login.jsx'
import Stations from './Stations.jsx'
import Station from './Station.jsx'

function RequireLogin({ children }) {
  return isConnected() ? children : <Navigate to='/' replace />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path='/login' element={<Login />} />
        <Route path='/stations' element={<RequireLogin><Stations /></RequireLogin>}>
          <Route path=':stationName' element={<Station />} />
        </Route>

      </Routes>
    </Router>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

import Login from './Login.jsx'
import Stations from './Stations.jsx'
import Station from './Station.jsx'

// import React from 'react'
// console.log(React.version)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path='/login' element={<Login />} />
        <Route path='/stations' element={<Stations />}>
          <Route path=':id' element={<Station />} />
        </Route>

      </Routes>
    </Router>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Login from './Login.jsx'
import Stations from './Stations.jsx'
import Station from './Station.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/stations' element={<Stations />}>
          <Route path='/station/:id' element={<Station />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)

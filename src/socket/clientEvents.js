import { io } from 'socket.io-client'

// Connection Handle
let socket = null

// CONNECT USER && SET SOCKET
export function connect(username, role, onLoginSuccess) {
  if (socket) return
  socket = io('http://localhost:3000')

  socket.on('connect', () => {
    socket.emit('login', username, role)
  })

  socket.on('loginSuccess', () => {
    onLoginSuccess?.()
  })
}

// DISCONNECT USER
export function disconnect() {
  socket?.disconnect()
  socket = null
}

// POPULATE STATIONS AND HANDLE UPDATES
export function getStations(setStations) {
  const loadStations = () => socket.emit('getStations', setStations)

  // First load
  loadStations()
  // Continuous
  socket.on('stationsChanged', loadStations)

  // Cleanup for strictmode
  return () => socket.off('stationsChanged', loadStations)
}

// CREATE STATIONS
export function createStation(stationName, creationResult) {
  socket.emit('stationCreationResult', stationName, creationResult)
}

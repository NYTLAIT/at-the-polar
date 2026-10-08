import { io } from 'socket.io-client'

// REMEMBER SOCKET AFTER CONNECT
let socket = null
export const isConnected = () => socket !== null

// ------ LOGIN AND DISCONNECT --------------------------------

// -- CONNECT USER && SET SOCKET --
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

// -- DISCONNECT USER --
export function disconnect() {
  socket?.disconnect()
  socket = null
}

// ------ SETTING STATIONS -----------------------------------

// -- POPULATE STATIONS AND HANDLE UPDATES --
export function getStations(setStations) {
  if (!socket) return () => { }

  const loadStations = () => socket.emit('getStations', setStations)

  loadStations() // First load
  socket.on('stationsChanged', loadStations) // Continuous

  return () => socket.off('stationsChanged', loadStations) // Cleanup for strictmode
}

// -- CREATE STATIONS --
export function createStation(stationName, creationResultAlert) {
  if (!socket) return
  socket.emit('createStation', stationName, creationResultAlert)
}

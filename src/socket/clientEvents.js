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

// POPULATE STATIONS 
export function getStations(onStations) {
  socket.emit('getStations', onGetStationsSuccess)
}
// CREATE STATIONS
export function createStation(stationName, creationResult) {
  socket.emit()
  socket.on('stationCreationResult', creationResult, stations)
}

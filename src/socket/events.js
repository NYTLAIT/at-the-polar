import { io } from 'socket.io-client'

// Connection Handle
let socket = null

export function connect(username, role, url) {
  if (socket) return
  const URL = url ?? import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:3000'
  socket = io(URL)

  socket.on('connection', () => {
    socket.emit('login', username, role)
  })
}

export function disconnect() {
  socket?.disconnect()
  socket = null
}

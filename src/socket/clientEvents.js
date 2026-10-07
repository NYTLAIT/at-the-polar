import { io } from 'socket.io-client'

// Connection Handle
let socket = null

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

export function disconnect() {
  socket?.disconnect()
  socket = null
}

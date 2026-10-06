import { io } from 'socket.io-client'

export function connect(username, role, url) {
  const URL = url ?? import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:3000'
  const socket = io(URL, { autoConnect: false })

  socket.on('connection',)
  socket.emit('register user', (username, role))

  return socket
}
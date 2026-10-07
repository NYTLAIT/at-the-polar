export function setConnection(io, state) {
  io.on('connection', (socket) => {

    socket.on('login', (username, role) => {
      // CONNECTION
      socket.username = username
      state.connections.set(username, socket.id)
      // PERSISTENT USER
      if (!state.users.has(username)) {
        state.users.set(username, {
          role,
          station: null,
          stations: {
            subscribed: [],
            memberOf: role === 'researcher' ? [] : null
          }
        })
      }

      state.connections.set(username, socket.id)
      console.log(state.connections)

      socket.emit('loginSuccess')
    })

    socket.on('disconnect', () => {
      const username = socket.username
      if (!username) return

      const user = state.users.get(username)
      user.station = null

      state.connections.delete(socket.username)
      console.log(state.connections)
    })
  })
}

export function setStations(io, state) {
  io.on('connection', (socket))
}
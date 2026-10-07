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
      const user = state.users.get(username)
      if (user) { user.station = null }

      if (socket.username) { state.connections.delete(socket.username) }
    })
  })
}

export function setStations(io, state) {
  io.on('connection', (socket))
}
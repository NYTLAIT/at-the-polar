export function setConnection(io, state) {
  io.on('connection', (socket) => {

    socket.on('login', (username, role) => {
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
      io.emit('users', [...state.users.values()])
    })

    socket.on('disconnect', () => {
      state.connections.delete(username)
      state.users.set(username[station] = null)
      io.emit('users', [...state.users.values()])
    })
  })
}

export function setStations(io, state) {
  io.on('connection', (socket))
}
// ------ LOGIN AND DISCONNECT --------------------------------
export function setConnection(socket, state) {
  socket.on('login', (username, role) => {
    // CONNECTION
    socket.data.username = username
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

    console.log(state.connections)

    socket.emit('loginSuccess')
  })

  // DISCONNECT
  socket.on('disconnect', () => {
    const username = socket.data.username
    if (!username) return

    const user = state.users.get(username)
    user.station = null

    state.connections.delete(socket.username)
    console.log(state.connections)
  })
}

// ------ SETTING STATIONS -----------------------------------
export function setStations(io, socket, state) {
  // GET USER STATIONS LIST
  socket.on('getStations', (onGetStationsSuccess) => {
    const user = state.users.get(socket.data.username)

    const stations = [...state.stations.values()]
    onGetStationsSuccess(stations)
  })

  socket.on('createStation', (stationName, creationResult) => {
    const user = state.users.get(socket.data.username)

    if (user.role !== 'researcher') {
      return creationResult('Only researchers can create stations')
    }
    if (!stationName?.trim()) {
      return creationResult('Station needs a name')
    }
    if (state.stations.has(stationName)) {
      return creationResult('Station name taken')
    }

    io.emit('changeStations')
    return creationResult('New Station Created!')
  })
}
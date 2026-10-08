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

    state.connections.delete(socket.data.username)
    console.log(state.connections)
  })
}

// ------ SETTING STATIONS -----------------------------------
export function setStations(io, socket, state) {
  function getUser() {
    return state.users.get(socket.data.username)
  }

  // GET USER STATIONS LIST
  socket.on('getStations', (setStations) => {
    const user = getUser()
    if (!user) return

    setStations({
      role: user.role,
      allStations: [...state.stations.keys()],
      subscribed: user.stations.subscribed,
      memberOf: user.stations.memberOf ?? []
    })
  })

  // CREATE STATION
  socket.on('createStation', (stationName, creationResultAlert) => {
    const user = getUser()
    if (!user) return

    if (user.role !== 'researcher') {
      return creationResultAlert('Only researchers can create stations')
    }
    if (!stationName?.trim()) {
      return creationResultAlert('Station needs a name')
    }
    if (state.stations.has(stationName)) {
      return creationResultAlert('Station name taken')
    }

    state.stations.set(stationName, { messages: [] }) // Add station to state
    user.stations.memberOf.push(stationName)

    io.emit('stationsChanged') // Update everybody about state
    creationResultAlert('New Station Created!')
  })

  // SUBSCRIPTIONS && JOINS
  // Subscibe
  socket.on('subscribeStation', (stationName, resultAlert) => {
    const user = getUser()
    if (!user) return
    if (user.stations.memberOf?.includes(stationName)) {
      return resultAlert?.('Members cannot subscribe to their own stations')
    }

    user.stations.subscribed.push(stationName)
    socket.emit('stationsChanged')
    resultAlert?.(`Subscribed to ${stationName}`)
  })
  // Unsubscibe
  socket.on('unsubscribeStation', (stationName, resultAlert) => {
    const user = getUser()
    if (!user) return

    user.stations.subscribed = user.stations.subscribed.filter(station => station !== stationName)
    socket.emit('stationsChanged')
    resultAlert?.(`Unsubscribed to ${stationName}`)
  })
  // Join
  socket.on('joinStation', (stationName, resultAlert) => {
    const user = getUser()
    if (!user) return
    if (user.role !== 'researcher') {
      return resultAlert?.('Only researchers can join stations')
    }

    user.stations.memberOf.push(stationName)
    user.stations.subscribed = user.stations.subscribed.filter((station) => station !== stationName)
    socket.emit('stationsChanged')
    resultAlert?.(`Joined ${stationName}`)
  })
  // Unjoin
  socket.on('leaveStation', (stationName, resultAlert) => {
    const user = getUser()
    if (!user) return
    if (user.role !== 'researcher') {
      return resultAlert?.('Only researchers can join stations')
    }

    user.stations.memberOf = user.stations.memberOf.filter(station => station !== stationName)
    socket.emit('stationsChanged')
    resultAlert?.(`Left ${stationName}`)
  })
}
import { setConnection } from "./serverEvents.js"
import { setStations } from "./serverEvents.js"

export function setFeatures(io) {
  const state = {
    // Tracks users
    users: new Map(),
    // Tracks users online
    connections: new Map(),
    // Stations && Messages
    stations: new Map()
  }

  io.on('connection', socket => {
    setConnection(socket, state)
    setStations(io, socket, state)
  })
}




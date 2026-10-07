import { setConnection } from "./serverEvents.js"

export function setFeatures(io) {
  const state = {
    // Tracks users
    users: new Map(),
    // Tracks users online
    connections: new Map(),
    // Stations && Messages
    stations: new Map()
  }

  setConnection(io, state)
}




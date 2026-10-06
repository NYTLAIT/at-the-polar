import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'

// EXPRESS & HTTP INTILIAZATION
const app = express()
const httpServer = createServer(app)

// CORS INITIALIZATION && CONFIG
app.use(cors())
const corsConfig = {
  cors: {
    origin: 'http://localhost:5173'
  }
}

// SOCKET.IO INITIALIZATION
const io = new Server(httpServer, corsConfig)

// ---- ROUTES --------------------------------------------

const userslist = []

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on('register user', (username) => {
    console.log(`${username} has connected with socket ${socket.id}`)

    userslist.push(username)

    io.emit('userslist', userslist)
  })
})

// ---- LISTENER --------------------------------------------
const port = 3000

httpServer.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
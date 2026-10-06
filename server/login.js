export function login(io) {
  const users = new Map()

  const broadcast = () => io.emit(users, [...users.values()])
}

const users = []

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on('register user', (username, role) => {
    userslist.push({ username: username, role: role })
    console.log(`${username} has connected with socket ${socket.id}`)

    console.log(users)
    io.emit('users', users)
  })
})
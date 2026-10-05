import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

function App() {
  const [username, setUsername] = useState('')
  const [usernames, setUsernames] = useState([])

  function connection(event) {
    event.preventDefault()
    socket.emit('register user', username)
  }

  useEffect(() => {
    socket.on('userslist', (userslist) => {
      setUsernames(userslist)
    })

    return () => {
      socket.off('userslist')
    }
  }, [])

  return (
    <>
      <form onSubmit={connection}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <button type="submit">
          Connect
        </button>
      </form>

      <ul>
        {usernames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  )
}

export default App

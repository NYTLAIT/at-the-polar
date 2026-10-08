# At The Polar
A real-time research station communication modeled after fandom platforms.

Users can create research stations, subscribe to stations, join stations as researchers, post updates, engage in threaded discussions.

# Websocket Use
At The Polar uses WebSockets for:
- Live station updates
- Interactive discussions

# Stack
- Built with React, Express, and Socket.IO.
- Uses module: https://github.com/NYTLAIT/at-the-polar-module

# Events
| Element | User Action | Event | Result |
| :--- | :--- | :--- | :--- |
| Login | Enters username and role | `login` | `loginSuccess` confirms login |
| Stations | Opens station list | `getStations` | Displays available stations |
| Create station | Creates a station | `createStation` | Station list updates |
| Subscribe | Subscribes to a station | `subscribeStation` | User can view and reply to messages |
| Join station | Joins as a researcher | `joinStation` | Researcher can post messages |
| Messages | Opens a station | `getMessages` | Displays station messages |
| Post message | Sends a message | `postMessage` | Message appears for connected users |
| Reply | Replies to a message | `replyToMessage` | Reply appears in the thread |
| Live updates | A message changes | `messagesChanged` | Clients refresh that station's messages |

# Workflow
1. React UI
2. Client emits Socket.IO event
3. Express / Socket.IO server
4. Validate request
5. Process Request: Update state and Broadcast update
6. Client refreshes UI

# Installation and running
1. Check if already have node and npm
2. Clone repo and navigate to
3. Install dependencies `npm install`
    - module https://github.com/NYTLAIT/at-the-polar-module must be cloned | publishing npm in process
4. Start the server with `node server.js`
5. Start the client with `npm run dev`
6. Open the Vite typically on `http://localhost:5173`

# Future Improvements
- Styling
- Database persistence
- Authentication
- Message pagination
- Image uploads
- Search functionality

#### Dev: NYTLAIT

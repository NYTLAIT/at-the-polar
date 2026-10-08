import { useState, useEffect } from "react"
import { Link, useParams, useOutletContext } from "react-router"
import { getMessages, postMessage, replyToMessage } from './socket/clientEvents'

function Message({ messageObject, canReply, onReply }) {
  return (
    <li>
      <p>{messageObject.timestamp}</p>
      <strong>{messageObject.user}</strong>
      <p>{messageObjectmessage.message}</p>
      {canReply && <button onClick={() => onReply(messageObject)}>Reply</button>}

      {messageObject.replies.length > 0 && (
        <ul>
          {messageObject.replies.map((reply) => (
            <Message key={reply.messageId} messageObject={reply} canReply={canReply} onReply={onReply} />
          ))}
        </ul>
      )}
    </li>
  )
}

function Station() {
  const { stationName } = useParams()
  const { role, subscribed, memberOf } = useOutletContext()
  const [messages, setMessages] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)

  useEffect(() => { // Reset when moving to another Station
    setMessages([])
    setReplyingTo(null)

    return getMessages(stationName, setMessages)
  }, [stationName])

  const isMember = memberOf.includes(stationName)
  const canPost = role === 'researcher' && isMember
  const canReply = isMember || subscribed.includes(stationName)

  function handleSend(formData) {
    const text = formData.get('text')

    if (replyingTo) {
      replyToMessage(stationName, replyingTo.messageId, text, console.log)
      setReplyingTo(null)
    } else {
      postMessage(stationName, text, console.log)
    }
  }

  return (
    <div className="Station">
      <div className="StationHeader">
        <Link className="chat-back-link" to="/stations">← Stations</Link>
        <h2>{stationName}</h2>
      </div>

      <ul>
        {messages.map((messageObject) => (
          <Message
            key={messageObject.messageId}
            messageObject={messageObject}
            canReply={canReply}
            onReply={setReplyingTo} />
        ))}
      </ul>

      {(canPost || replyingTo) && (
        <form action={handleSend}>
          {replyingTo && <p>Replying to {replyingTo.user}</p>}
          <input name="text" type="text" autoComplete="off" required />
          <button type="submit">{replyingTo ? 'Reply' : 'Post'}</button>
          {replyingTo && (
            <button type="button" onClick={() => setReplyingTo(null)}>Cancel</button>
          )}
        </form>
      )}
    </div>
  )
}

export default Station
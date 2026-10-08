import { useContext } from "react"
import { Link, useParams, useOutletContext } from "react-router"


function Station() {
  const { stationName } = useParams()
  const { role, subscribed, memberOf } = useOutletContext()

  return (
    <div className="StationChat">

      <div className="StationHeader">
        <Link className="chat-back-link" to="/stations">← Stations</Link>
        <h2>{stationName}</h2>
      </div>

      {/* messages*/}
    </div>
  )
}

export default Station
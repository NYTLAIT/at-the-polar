import { useState } from "react"
import { Link } from "react-router"
import StationsOptionsModal from "./StationsOptionsModal"


function StationsThumbnail({ stationName, role, isSubscribed, isMember }) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="StationsThumbnail">
      <Link className="StationsThumbnail-link" to={`/stations/${encodeURIComponent(stationName)}`}>
        {stationName}
      </Link>

      <button
        aria-label={`Options for ${stationName}`}
        onClick={() => setModalOpen(true)}
      >⋮
      </button>

      {modalOpen && (
        <StationsOptionsModal
          name={stationName}
          role={role}
          isSubscribed={isSubscribed}
          isMember={isMember}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default StationsThumbnail
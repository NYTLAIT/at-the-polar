import { useState, useRef } from "react"
import { Link } from "react-router"

import { useClickOutside } from "./hooks/useClickOutside"
import StationsOptionsMenu from "./StationsOptionsMenu"


function StationsThumbnail({ stationName, role, isSubscribed, isMember }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => setMenuOpen(false))

  return (
    <div className="StationsThumbnail" ref={wrapperRef}>
      <Link className="StationsThumbnail-link" to={`/stations/${encodeURIComponent(stationName)}`}>
        {stationName}
      </Link>

      <button
        className="StationsThumbnail-menuButton"
        aria-label={`Options for ${stationName}`}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >⋮
      </button>

      {menuOpen && (
        <StationsOptionsMenu
          stationName={stationName}
          role={role}
          isSubscribed={isSubscribed}
          isMember={isMember}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default StationsThumbnail
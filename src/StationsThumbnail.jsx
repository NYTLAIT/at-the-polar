import { useState } from "react"
import { Link } from "react-router"


function StationsThumbnail({ station }) {
  return (
    <div className="StationsThumbnail">
      <p>{station}</p>
    </div>
  )
}

export default StationsThumbnail
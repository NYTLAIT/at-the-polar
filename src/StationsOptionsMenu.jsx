import { subscribeStation, unsubscribeStation, joinStation, leaveStation } from "./socket/clientEvents"

function StationsOptionsMenu(prop) {
  const { stationName, role, isSubscribed, isMember, onClose } = prop
  function runMenuAction(menuAction) {
    menuAction(stationName, console.log)
    onClose()
  }

  return (
    <div className="StationsOptionsModal">
      {/* Researchers cannot subscribe to a station they are a member of */}
      {!isMember && (
        <button onClick={() => runMenuAction(isSubscribed ? unsubscribeStation : subscribeStation)}>
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      )}

      {/* Only researchers can join stations */}
      {role === 'researcher' && (
        <button onClick={() => runMenuAction(isMember ? leaveStation : joinStation)}>
          {isMember ? 'Leave' : 'Join'}
        </button>
      )}
    </div>
  )
}

export default StationsOptionsMenu
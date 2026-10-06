import { Outlet } from 'react-router'

function Stations() {
  return (
    <div>
      <div className='Stations'>
      </div>

      <div className='Station'>
        <Outlet />
      </div>
    </div>
  )
}

export default Stations
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { logout } from 'features/user'

import 'bootstrap/dist/css/bootstrap.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  // const { isAuthenticated } = useSelector(state => state.user)

  return (
    <>
      <h1 className='mb-5'>Smart Meter App</h1>
      <p>Dashboard</p>
    </>
  )
}

export default Dashboard

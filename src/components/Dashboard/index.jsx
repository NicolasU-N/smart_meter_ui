// import { Link, NavLink } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from 'features/user'
import Layout from '@components/Layout'

const Dashboard = () => {
  // const dispatch = useDispatch()
  // const { isAuthenticated } = useSelector(state => state.user)

  return (
    <Layout title='Smart Meter App | Dashboard' content='Dashboard page'>
      <h1 className='mb-5'>Smart Meter App</h1>
      <p>Dashboard</p>
    </Layout>
  )
}

export default Dashboard

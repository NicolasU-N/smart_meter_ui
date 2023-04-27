// import { Link, NavLink } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from 'features/user'

import Layout from '@components/Layout'

const Home = () => {
  // const dispatch = useDispatch()
  // const { isAuthenticated } = useSelector(state => state.user)

  return (
    <Layout title='Smart Meter App | Home' content='Home page'>
      <h1 className='mb-5'>Smart Meter App</h1>
      <p>Welcome to Smart Meter App!</p>
    </Layout>
  )
}

export default Home

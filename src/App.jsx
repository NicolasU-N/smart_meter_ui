
import { useEffect } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCheckAuth } from '@store/auth/actions'

import Home from '@components/Home'
import Dashboard from '@components/Dashboard'
import Login from '@components/Login'
import Register from '@components/Register'
import DeviceHistory from '@components/Dashboard/history'

// import styles from './App.module.scss'

import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  const dispatch = useDispatch()

  const { isAuthenticated, authLoading } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    dispatch(fetchCheckAuth())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route exact path='/devices/:deviceId/history' element={<DeviceHistory />} />
          {/* <Route path='/users/*' element={<UsersContainer />} /> */}
        </Routes>
        {/* {(!isAuthenticated && !authLoading) && <Navigate to='/login' />} */}
      </BrowserRouter>
    </>
  )
}

export default App

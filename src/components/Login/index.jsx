import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { authActions } from '@store/auth/index'
import { fetchLogin } from '@store/auth/actions'

import Layout from '@components/Layout'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { authLoading, isAuthenticated, registered } = useSelector(
    state => state.auth
  )

  const { resetRegistered } = authActions

  useEffect(() => {
    if (registered) dispatch(resetRegistered())
  }, [registered])

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch(fetchLogin({ username, password }))
  }

  if (isAuthenticated) return <Navigate to='/dashboard' />

  return (
    <Layout title='Smart Meter App | Login' content='Login page'>
      <h1>Log into your Account</h1>
      <form className='mt-5' onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='form-label' htmlFor='username'>
            Username
          </label>
          <input
            className='form-control'
            type='text'
            name='username'
            onChange={onChange}
            value={username}
            required
          />
        </div>
        <div className='form-group mt-3'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input
            className='form-control'
            type='password'
            name='password'
            onChange={onChange}
            value={password}
            required
          />
        </div>
        {authLoading
          ? (
            <div className='spinner-border text-primary mt-4' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            )
          : (
            <button className='btn btn-primary mt-4'>Login</button>
            )}
      </form>
    </Layout>
  )
}

export default LoginPage

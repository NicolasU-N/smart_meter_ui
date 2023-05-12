import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { fetchRegister } from '@store/auth/actions'

import Layout from '@components/Layout'

const Register = () => {
  const dispatch = useDispatch()
  const { registered, loading } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    username: ''
  })

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { username, firstName, lastName, email, password, passwordConfirm } = formData
  const onSubmit = e => {
    e.preventDefault()
    dispatch(fetchRegister({ username, firstName, lastName, email, password, passwordConfirm }))
  }

  if (registered) return <Navigate to='/login' />

  return (
    <Layout title='Smart Meter App | Register' content='Register page'>
      <h1>Register for an Account</h1>
      <form className='mt-5' onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='form-label' htmlFor='first_name'>
            Username
          </label>
          <input
            className='form-control'
            type='text'
            name='username'
            onChange={onChange}
            defaultValue={formData.username}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='first_name'>
            First Name
          </label>
          <input
            className='form-control'
            type='text'
            name='first_name'
            onChange={onChange}
            defaultValue={formData.firstName}
            required
          />
        </div>
        <div className='form-group mt-3'>
          <label className='form-label' htmlFor='last_name'>
            Last Name
          </label>
          <input
            className='form-control'
            type='text'
            name='last_name'
            onChange={onChange}
            defaultValue={formData.lastName}
            required
          />
        </div>
        <div className='form-group mt-3'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            className='form-control'
            type='email'
            name='email'
            onChange={onChange}
            defaultValue={formData.email}
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
            defaultValue={formData.password}
            required
          />
        </div>
        <div className='form-group mt-3'>
          <label className='form-label' htmlFor='passwordConfirm'>
            Password Confirm
          </label>
          <input
            className='form-control'
            type='passwordConfirm'
            name='passwordConfirm'
            onChange={onChange}
            defaultValue={formData.passwordConfirm}
            required
          />
        </div>
        {loading
          ? (
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            )
          : (
            <button className='btn btn-primary mt-4'>Register</button>
            )}
      </form>
    </Layout>
  )
}

export default Register

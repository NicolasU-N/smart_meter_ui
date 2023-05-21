import axiosInstance from '@axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'

// import { useNavigate } from 'react-router-dom'

// import { authActions } from './index'

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async ({ username, firstName, lastName, email, password, passwordConfirm }, thunkAPI) => {
    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirm: passwordConfirm,
      username
    })

    try {
      const response = await axiosInstance.post('register/', body)

      const data = response.data

      if (response.status === 201) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    const body = JSON.stringify({
      username,
      password
    })

    try {
      const response = await axiosInstance.post('login/', body)
      // console.log('response login-> ', response)

      const data = response.data

      if (response.status === 200) {
        // Guardar tokens en el localStorage
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)

        // Decodificar el token JWT y obtener el user_id
        const decodedToken = jwt_decode(data.access)
        const userId = decodedToken.user_id
        console.log('userId -> ', userId)
        // Llamar a fetchUserById con el user_id
        const { dispatch } = thunkAPI
        dispatch(fetchUserById(userId))

        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const fetchUserById = createAsyncThunk(
  'auth/userById',
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`users/${userId}/`)

      const data = response.data

      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })

export const fetchCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    const access = localStorage.getItem('access_token')

    try {
      const body = JSON.stringify({
        token: access
      })

      const response = await axiosInstance.post('verify/', body)

      const data = response.data

      if (response.status === 200) {
        // Decodificar el token JWT y obtener el user_id
        const decodedToken = jwt_decode(access)
        const userId = decodedToken.user_id
        console.log('userId verify-> ', userId)
        // Llamar a fetchUserById con el user_id
        const { dispatch } = thunkAPI
        dispatch(fetchUserById(userId))

        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const refresh = localStorage.getItem('refresh_token')

      const body = JSON.stringify({
        refresh
      })

      const response = await axiosInstance.post('logout/', body)

      const data = response.data

      if (response.status === 205) {
        // Eliminar los tokens del localStorage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        // Llamar a fetchCheckAuth para actualizar el estado de autenticación
        const { dispatch } = thunkAPI
        dispatch(fetchCheckAuth())

        return response
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })

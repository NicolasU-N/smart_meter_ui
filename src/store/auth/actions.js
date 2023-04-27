import axiosInstance from '@axiosInstance'
import jwt_decode from 'jwt-decode'

import { createAsyncThunk } from '@reduxjs/toolkit'
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

      const data = await response.json()

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
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password
    })

    try {
      const response = await axiosInstance.post('login/', body)

      const data = await response.json()

      if (response.status === 200) {
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

      const data = await response.json()

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
    // TODO: Agregar manejo de localstorage
    const refresh = localStorage.getItem('refresh')

    try {
      const body = JSON.stringify({
        token: refresh
      })

      const response = await axiosInstance.post('verify/', body)

      const data = await response.json()

      if (response.status === 200) {
        // TODO: dispatch fetchUserById
        // const { dispatch } = thunkAPI
        // dispatch(getUser())

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
      // TODO: Agregar manejo de localstorage
      const refresh = localStorage.getItem('refresh')

      const body = JSON.stringify({
        refresh
      })

      const response = await axiosInstance.post('logout/', body)

      const data = await response.json()

      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })

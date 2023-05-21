import axiosInstance from '@axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import jwt_decode from 'jwt-decode'

export const fetchDevices = createAsyncThunk(
  'devices/allDevices',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('devices/')

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

export const fetchMeasurementDeviceId = createAsyncThunk(
  'devices/measurementDeviceId',
  async (deviceId, thunkAPI) => {
    try {
      const response = await axiosInstance.get('measurements/', {
        params: { device_id: deviceId }
      })

      const data = response.data.results

      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import devicesReducer from './devices'

const store = configureStore({
  reducer: {
    auth: authReducer,
    devices: devicesReducer
  }
})

export default store

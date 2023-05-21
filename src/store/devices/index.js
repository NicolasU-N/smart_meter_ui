import { createSlice } from '@reduxjs/toolkit'
import { fetchDevices, fetchMeasurementDeviceId } from './actions'

const initialState = {
  deviceLoading: true,
  devices: [],
  measurements: []
}

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setWebSocketData (state, action) {
      // console.log('action payload value -> ', action.payload.value)
      const { id, eui, rssi, snr, volume, battery_level, updated_at } = action.payload.value

      // Find the index of the device that matches the id and eui of the incoming message
      const deviceIndex = state.devices.findIndex(device => device.id === id && device.eui === eui)
      console.log('deviceIndex -> ', deviceIndex)
      // If the device is found, update the rssi, volume, battery_level, and updated_at fields
      if (deviceIndex !== -1) {
        // El dispositivo ya existe, actualizamos sus campos
        state.devices[deviceIndex].rssi = rssi
        state.devices[deviceIndex].snr = snr
        state.devices[deviceIndex].volume = volume
        state.devices[deviceIndex].battery_level = battery_level
        state.devices[deviceIndex].updated_at = updated_at

        // Creamos un nuevo objeto de measurement y lo agregamos al array
        const measurement = {
          // id: state.measurements.length + 1,
          device: { id, eui },
          rssi,
          snr,
          volume,
          battery_level,
          created_at: new Date().toISOString()
        }
        state.measurements.push(measurement)
      } else {
        // El dispositivo no existe, creamos uno nuevo
        const newDevice = {
          id,
          eui,
          rssi,
          snr,
          volume,
          battery_level,
          created_at: updated_at,
          updated_at
        }

        // Agregamos el nuevo dispositivo al array
        state.devices.push(newDevice)

        // Creamos un nuevo objeto de measurement y lo agregamos al array
        const measurement = {
          // id: state.measurements.length + 1,
          device: { id: newDevice.id, eui: newDevice.eui },
          rssi: newDevice.rssi,
          snr: newDevice.snr,
          volume: newDevice.volume,
          battery_level: newDevice.battery_level,
          payload: JSON.stringify(newDevice),
          created_at: new Date().toISOString()
        }
        state.measurements.push(measurement)
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDevices.pending, state => {
        state.deviceLoading = true
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.deviceLoading = false
        console.log('action.payload fetchDevices -> ', action.payload)
        state.devices = action.payload.results
      })
      .addCase(fetchDevices.rejected, state => {
        state.deviceLoading = false
      })
      .addCase(fetchMeasurementDeviceId.pending, state => {
        state.deviceLoading = true
      })
      .addCase(fetchMeasurementDeviceId.fulfilled, (state, action) => {
        state.deviceLoading = false
        // console.log('action.payload -> ', action.payload)
        state.measurements = action.payload
      })
      .addCase(fetchMeasurementDeviceId.rejected, state => {
        state.deviceLoading = false
      })
  }
})

export const devicesActions = deviceSlice.actions

export default deviceSlice.reducer

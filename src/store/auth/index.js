import { createSlice } from '@reduxjs/toolkit'
import { fetchRegister, fetchLogin, fetchUserById, fetchCheckAuth, fetchLogout } from './actions'

const initialState = {
  loading: false,
  registered: false,
  isAuthenticated: false,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegistered (state) {
      state.registered = false
    }
    // Implementar middleware para resetear el estado del access token
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegister.pending, state => {
        state.loading = true
      })
      .addCase(fetchRegister.fulfilled, state => {
        state.loading = false
        state.registered = true
      })
      .addCase(fetchRegister.rejected, state => {
        state.loading = false
      })
      .addCase(fetchLogin.pending, state => {
        state.loading = true
      })
      .addCase(fetchLogin.fulfilled, state => {
        // console.log('fetchLogin.fulfilled!')
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(fetchLogin.rejected, state => {
        state.loading = false
      })
      .addCase(fetchUserById.pending, state => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, state => {
        state.loading = false
      })
      .addCase(fetchCheckAuth.pending, state => {
        state.loading = true
      })
      .addCase(fetchCheckAuth.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(fetchCheckAuth.rejected, state => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(fetchLogout.pending, state => {
        state.loading = true
      })
      .addCase(fetchLogout.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(fetchLogout.rejected, state => {
        state.loading = false
      })
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer

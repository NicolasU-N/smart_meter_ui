import { createSlice } from '@reduxjs/toolkit'
import { fetchRegister, fetchLogin, fetchUserById, fetchCheckAuth, fetchLogout } from './actions'

const initialState = {
  authLoading: true,
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
        state.authLoading = true
      })
      .addCase(fetchRegister.fulfilled, state => {
        state.authLoading = false
        state.registered = true
      })
      .addCase(fetchRegister.rejected, state => {
        state.authLoading = false
      })
      .addCase(fetchLogin.pending, state => {
        state.authLoading = true
      })
      .addCase(fetchLogin.fulfilled, state => {
        // console.log('fetchLogin.fulfilled!')
        state.authLoading = false
        state.isAuthenticated = true
      })
      .addCase(fetchLogin.rejected, state => {
        state.authLoading = false
      })
      .addCase(fetchUserById.pending, state => {
        state.authLoading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.authLoading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, state => {
        state.authLoading = false
      })
      .addCase(fetchCheckAuth.pending, state => {
        state.authLoading = true
      })
      .addCase(fetchCheckAuth.fulfilled, state => {
        state.authLoading = false
        state.isAuthenticated = true
      })
      .addCase(fetchCheckAuth.rejected, state => {
        state.authLoading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(fetchLogout.pending, state => {
        state.authLoading = true
      })
      .addCase(fetchLogout.fulfilled, state => {
        state.authLoading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(fetchLogout.rejected, state => {
        state.authLoading = false
      })
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer

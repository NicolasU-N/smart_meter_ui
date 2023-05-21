import { useEffect } from 'react'
// import { Link, NavLink, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '@components/Layout'

import { fetchDevices } from '@store/devices/actions'
import { devicesActions } from '@store/devices'

import DeviceTable from './DeviceTable'
import Loader from './Loader'

const WS_ENDPOINT = 'ws://localhost:8000/ws/dashboard/' // endpoint del WebSocket

const Dashboard = () => {
  const dispatch = useDispatch()
  const { authLoading } = useSelector(state => state.auth)
  const { deviceLoading } = useSelector(state => state.devices)

  const { setWebSocketData } = devicesActions

  useEffect(() => {
    dispatch(fetchDevices())

    // ? Socket
    const socket = new WebSocket(WS_ENDPOINT)

    socket.addEventListener('open', (event) => {
      console.log('WebSocket conectado')
    })

    socket.addEventListener('message', (event) => {
      console.log('Mensaje recibido del servidor:', event.data)
      try {
        const message = JSON.parse(event.data)
        console.log('Mensaje parseado:', message)
        dispatch(setWebSocketData(message))
      } catch (err) {
        console.error('Error parsing message:', err)
      }
    })

    socket.addEventListener('close', (event) => {
      console.log('WebSocket desconectado')
    })

    return () => {
      console.log('Cerrando conexión WebSocket')
      socket.close()
    }
  }, [dispatch])

  if (deviceLoading || authLoading) {
    return <Loader />
  }

  return (
    <Layout title='Smart Meter App | Dashboard' content='Dashboard page'>
      <DeviceTable />
    </Layout>
  )
}

export default Dashboard

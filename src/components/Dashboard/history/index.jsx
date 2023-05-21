import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchMeasurementDeviceId } from '@store/devices/actions'

import { useParams } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { format } from 'date-fns'

import Layout from '@components/Layout'
import Loader from '../Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const DeviceHistory = () => {
  const dispatch = useDispatch()
  const { deviceId } = useParams()
  const { deviceLoading, measurements } = useSelector(state => state.devices)

  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        dispatch(fetchMeasurementDeviceId(deviceId))
      } catch (error) {
        console.error(error)
      }
    }

    fetchChartData()
  }, [deviceId, dispatch])

  useEffect(() => {
    if (measurements && measurements.length > 0) {
      console.log('Measurement after condition -> ', measurements)
      const labels = measurements.map(entry =>
        format(new Date(entry.created_at), 'dd/MM/yyyy HH:mm:ss')
      )
      const values = measurements.map(entry => entry.volume)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Mediciones',
            data: values,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(75, 192, 192)',
            pointBackgroundColor: 'rgba(75, 192, 192)'
            // borderColor: 'rgb(255, 99, 132)',
          }
        ]
      })

      setChartOptions(
        {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            },
            scales: {
              x: {
                ticks: { color: 'rgb(75, 192, 192)' }
              },
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }

        }
      )
    }
  }, [measurements])

  if (deviceLoading) {
    return <Loader />
  }

  return (
    <Layout title='Smart Meter App | History' content='Measurement history'>
      <div>
        <h1>Historial de mediciones</h1>
        {measurements && measurements.length > 0
          ? (
            <Line data={chartData} options={chartOptions} />
            )
          : (
            <p> No hay datos de mediciones disponibles.</p>
            )}
      </div>
    </Layout>
  )
}

export default DeviceHistory

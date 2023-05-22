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
import { format, startOfDay } from 'date-fns'

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
  const [filterDate, setFilterDate] = useState(undefined)

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
      const filteredMeasurements = filterMeasurementsByDate(measurements, filterDate)
      const groupedMeasurements = groupMeasurementsByDay(filteredMeasurements)
      const labels = Object.keys(groupedMeasurements).map(label => format(Number(label), 'dd MMM yyyy'))
      const values = Object.values(groupedMeasurements).map(getLastValue)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Liters',
            data: values,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(75, 192, 192)',
            pointBackgroundColor: 'rgba(75, 192, 192)'
          }
        ]
      })

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            // text: 'Chart.js Line Chart'
            text: filterDate === 'year' ? 'Annual consumption' : filterDate === 'month' ? 'Monthly consumption' : filterDate === 'week' ? 'Weekly consumption' : 'All consumption'
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
      })
    }
  }, [measurements, filterDate])

  const filterMeasurementsByDate = (measurements, filterDate) => {
    if (!filterDate) {
      return measurements
    }

    // Filtrar por año
    if (filterDate === 'year') {
      return measurements.filter(entry => {
        const measurementDate = new Date(entry.created_at)
        const currentYear = new Date().getFullYear()
        return measurementDate.getFullYear() === currentYear
        // change title of graph to Annual consumption
      })
    }

    // Filtrar por mes
    if (filterDate === 'month') {
      return measurements.filter(entry => {
        const measurementDate = new Date(entry.created_at)
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        return (
          measurementDate.getMonth() === currentMonth &&
          measurementDate.getFullYear() === currentYear
        )
      })
    }

    // Filtrar por semana
    if (filterDate === 'week') {
      return measurements.filter(entry => {
        const measurementDate = new Date(entry.created_at)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentWeek = getWeekNumber(currentDate)

        return (
          getWeekNumber(measurementDate) === currentWeek &&
          measurementDate.getFullYear() === currentYear
        )
      })
    }

    return measurements
  }

  const groupMeasurementsByDay = measurements => {
    const groupedMeasurements = {}
    measurements.forEach(entry => {
      const measurementDate = startOfDay(new Date(entry.created_at)).getTime()
      if (!groupedMeasurements[measurementDate]) {
        groupedMeasurements[measurementDate] = []
      }
      groupedMeasurements[measurementDate].push(entry)
    })
    return groupedMeasurements
  }

  const getLastValue = measurements => {
    const lastMeasurement = measurements[measurements.length - 1]
    return lastMeasurement.volume
  }

  const handleFilterChange = event => {
    setFilterDate(event.target.value)
  }

  const getWeekNumber = date => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  // Resto del código sin cambios
  if (deviceLoading) {
    return <Loader />
  }

  return (
    <Layout title='Smart Meter App | History' content='Measurement history'>
      <div>
        <h1>Measurement history</h1>
        <div>
          <label htmlFor='filterDate' className='col-md-1'>Filter by: </label>
          <select id='filterDate' value={filterDate} onChange={handleFilterChange}>
            <option value=''>All</option>
            <option value='year'>Annual</option>
            <option value='month'>Monthly</option>
            <option value='week'>Weekly</option>
          </select>
        </div>
        {measurements && measurements.length > 0
          ? (
            <Line data={chartData} options={chartOptions} />
            )
          : (
            <p>There are no measurement data available.</p>
            )}
      </div>
    </Layout>
  )
}

export default DeviceHistory

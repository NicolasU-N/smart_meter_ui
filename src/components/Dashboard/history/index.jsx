import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMeasurementDeviceId } from '@store/devices/actions'
import { useParams } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { format, startOfDay } from 'date-fns'

import Layout from '@components/Layout'
import Loader from '../Loader'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const DeviceHistory = () => {
  const dispatch = useDispatch()
  const { deviceId } = useParams()
  const { deviceLoading, measurements } = useSelector(state => state.devices)

  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})
  const [filterDate, setFilterDate] = useState('week')

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
      const sortedLabels = Object.keys(groupedMeasurements)
        .map(label => Number(label))
        .sort((a, b) => a - b)
        .map(label => format(label, 'dd MMM yyyy'))
      const values = Object.values(groupedMeasurements).map(getLastValue)

      setChartData({
        labels: sortedLabels,
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
            text: filterDate === 'year' ? 'Annual consumption' : filterDate === 'month' ? 'Monthly consumption' : filterDate === 'week' ? 'Weekly consumption' : 'All consumption'
          }
        },
        scales: {
          x: {
            // color: 'rgb(75, 192, 192)',
            color: 'rgb(20, 20, 20)',
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      })
    }
  }, [measurements, filterDate])

  const filterMeasurementsByDate = (measurements, filterDate) => {
    if (!filterDate) {
      return measurements
    }

    if (filterDate === 'year') {
      return measurements.filter(entry => {
        const measurementDate = new Date(entry.created_at)
        const currentYear = new Date().getFullYear()
        return measurementDate.getFullYear() === currentYear
      })
    }

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

  if (deviceLoading) {
    return <Loader />
  }

  return (
    <Layout title='Smart Meter App | History' content='Measurement history'>
      <div>
        <h1>Measurement history</h1>

        <div className='d-flex'>
          <div className='col-10'>
            {measurements && measurements.length > 0
              ? (
                <Line data={chartData} options={chartOptions} />
                )
              : (
                <p>There are no measurement data available.</p>
                )}
          </div>
          <div className='col-2'>
            <label htmlFor='filterDate'>Filter by:</label>
            <select id='filterDate' value={filterDate} onChange={handleFilterChange} className='form-select'>
              <option value=''>All</option>
              <option value='year'>Annual</option>
              <option value='month'>Monthly</option>
              <option value='week'>Weekly</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default DeviceHistory

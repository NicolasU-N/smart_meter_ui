import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// if (typeof window !== 'undefined') {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token')
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       return config
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
//   )
// }

export default axiosInstance

import axios from 'axios'

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || 'token'
export const makeApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
  })

  // set content-type
  api.defaults.headers.post['Content-Type'] = 'application/json'
  api.defaults.headers.put['Content-Type'] = 'application/json'
  api.defaults.headers.delete['Content-Type'] = 'application/json'

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem(ACCESS_TOKEN)
      if (token) {
        config.headers = {
          ...config.headers,
          token,
        }
      }
      // Jsession login needs to enable this
      config.withCredentials = true
      return config
    },
    error => Promise.reject(error),
  )
  api.interceptors.response.use(
    response => response.data, // return data object
    error => Promise.reject(error),
  )
  return api
}

export const makeApiForm = (baseURL: string) => {
  const api = axios.create({
    baseURL,
  })

  // set content-type
  api.defaults.headers.post['Content-Type'] = 'multipart/form-data'

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem(ACCESS_TOKEN)
      if (token) {
        config.headers = {
          ...config.headers,
          token,
        }
      }
      return config
    },
    error => Promise.reject(error),
  )
  api.interceptors.response.use(
    response => response.data, // return data object
    error => Promise.reject(error),
  )
  return api
}

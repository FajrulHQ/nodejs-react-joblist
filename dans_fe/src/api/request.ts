import axios, { AxiosRequestConfig } from "axios"

interface APIRequestType {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  url?: string
  data?: any,
  params?: any
}

const API_SERVICE = 'http://localhost:8080'

const token = localStorage.getItem('token')

const APIRequest = async ({
  method,
  path,
  url = API_SERVICE,
  data = {},
  params = {},
}: APIRequestType) => {
  const config: AxiosRequestConfig = {
    method,
    url: url + path,
    data,
    params
  }
  if (token) {
    config.headers = { 'Authorization': `Bearer ${token}` }
  }
  return axios(config)
}

export default APIRequest
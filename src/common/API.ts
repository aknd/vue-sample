import axios, { AxiosInstance, AxiosResponse } from 'axios'

const invokeRequest = async (request: () => Promise<AxiosResponse>): Promise<any> =>  {
  const response = await request()
  return response.data
}

class API {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async get(path: string, params?: any): Promise<any> {
    const request = (): Promise<AxiosResponse> =>
      this.client.get(path, { params })
    const responseData = await invokeRequest(request)
    return responseData
  }

  async delete(path: string, params?: any): Promise<any> {
    const request = (): Promise<AxiosResponse> =>
      this.client.delete(path, { params })
    const responseData = await invokeRequest(request)
    return responseData
  }

  async post(path: string, data: any): Promise<any> {
    const request = (): Promise<AxiosResponse> => this.client.post(path, data)
    const responseData = await invokeRequest(request)
    return responseData
  }

  async put(path: string, data: any): Promise<any> {
    const request = (): Promise<AxiosResponse> => this.client.put(path, data)
    const responseData = await invokeRequest(request)
    return responseData
  }

  async patch(path: string, data: any): Promise<any> {
    const request = (): Promise<AxiosResponse> => this.client.patch(path, data)
    const responseData = await invokeRequest(request)
    return responseData
  }
}

export default new API()

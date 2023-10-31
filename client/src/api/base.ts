import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const base = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 
        "Content-Type": "application/json",
    } 
})

const get = (path: string, params?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.get(path, { params, ...config })
        return resolve(resp)
    } catch (error) {
        console.error((error as AxiosError).message)
        reject({ status: (error as AxiosError).status || 500, message: (error as AxiosError).message })
    }
})

const post = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.post(path, data, config)
        return resolve(resp)
    } catch (error) {
        console.error((error as AxiosError).message)
        reject({ status: (error as AxiosError).status || 500, message: (error as AxiosError).message })
    }
})

const put = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.put(path, data, config)
        return resolve(resp)
    } catch (error) {
        console.error((error as AxiosError).message)
        reject({ status: (error as AxiosError).status || 500, message: (error as AxiosError).message })
    }
})

const del = (path: string, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.delete(path, config)
        return resolve(resp)
    } catch (error) {
        console.error((error as AxiosError).message)
        reject({ status: (error as AxiosError).status || 500, message: (error as AxiosError).message })
    }
})


export default { get, post, put, del }

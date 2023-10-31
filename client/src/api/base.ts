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
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message: string }).message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const post = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.post(path, data, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message: string }).message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const put = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.put(path, data, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message: string }).message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const del = (path: string, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.delete(path, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message: string }).message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})


export default { get, post, put, del }

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { checkTokenIsExpired } from '@utils'

const base = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL || process.env.VITE_API_URL,
    headers: { 
        "Content-Type": "application/json"
    },
    // withCredentials: true
})

/**
 * Adds an authorization header with the access token
 * to requests if one exists in local storage.
 */
base.interceptors.request.use(async (config) => {
  try {
    let accessToken = localStorage.getItem("accessToken")
    if (checkTokenIsExpired(accessToken)) {
      accessToken = (await axios.post<{ accessToken: string }>(`${import.meta.env.VITE_API_URL || process.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })).data.accessToken
      localStorage.setItem("accessToken", accessToken)
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  } catch (error) {
    return config;
  }
});

/*
base.interceptors.response.use(undefined, async (error) => {
    let retry = false;
    if (error.response?.status === 401) {
        try {
            const accessToken = (await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })).data.accessToken as string
            localStorage.setItem("accessToken", accessToken)
            error.config.headers.Authorization = `Bearer ${accessToken}`
            if (!retry) {
                retry = true
                return base(error.config)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
});
*/

base.interceptors.response.use(undefined, async (error) => {
    const config = error.config
    if (!config._retry) {
        config._retry = true
        if (error.response?.status === 401) {
            try {
                const response = (await axios.post<{ accessToken: string }>(`${import.meta.env.VITE_API_URL || process.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true }))
                const accessToken = response.data.accessToken
                localStorage.setItem("accessToken", accessToken)
                config.headers.Authorization = `Bearer ${accessToken}`
                return base(config)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
    }
    return Promise.reject(error)
})


const get = (path: string, params?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.get(path, { params, ...config })
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message?: string })?.message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const post = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.post(path, data, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message?: string })?.message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const put = (path: string, data?: any, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.put(path, data, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message?: string })?.message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

const del = (path: string, config?: AxiosRequestConfig) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const resp = await base.delete(path, config)
        return resolve(resp)
    } catch (error) {
        const respError = { status: (error as AxiosError).response?.status || (error as AxiosError).status, message: ((error as AxiosError).response?.data as { message?: string })?.message || (error as AxiosError).message }
        console.error(respError)
        reject(respError)
    }
})

export default { get, post, put, del }
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { checkTokenIsExpired } from '@utils'

const base = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL,
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
    let accessToken = localStorage.getItem("accessToken");
    if (checkTokenIsExpired(accessToken)) {
      accessToken = (await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })).data.accessToken as string;
      localStorage.setItem("accessToken", accessToken);
    //   console.log("accessToken refreshed");
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  } catch (error) {
    return config;
  }
});

base.interceptors.response.use((response) => {
    console.log(response.data)
    return response;
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
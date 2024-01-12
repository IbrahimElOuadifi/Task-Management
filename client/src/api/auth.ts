import base from './base'
import { User, UserLogin, UserRegister } from '@interfaces/User'

export const login = (data: UserLogin) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/login', data, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const register = (data: UserRegister) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/register', data, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const refreshSession = () => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/refresh', {}, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const checkSession = () => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/auth/session')
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const logoutUser = () => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/logout', {}, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateProfile = (data: User) => new Promise(async (resolve, reject) => {
    try {
        // const formData = new FormData()
        // formData.append('avatar', data.avatar || '')
        // formData.append('firstName', data.firstName)
        // formData.append('lastName', data.lastName)
        // formData.append('email', data.email)
        // formData.append('username', data.username)
        // formData.append('confirmPassword', data.password || '')
        const resp = await base.put('/auth/profile', data, { headers: { 'Content-Type':'multipart/form-data' } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
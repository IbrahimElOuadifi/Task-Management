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
        const resp = await base.put('/auth/profile', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updatePassword = (data: User) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/auth/password', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateProfilePicture = (data: { avatar: File }) => new Promise(async (resolve, reject) => {
    try {
        const formData = new FormData()
        if(!data.avatar) return reject('No file selected')
        formData.append('avatar', data.avatar)
        const resp = await base.put('/auth/profile/picture', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getSessions = () => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/auth/sessions', {}, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const deleteSession = (id: string) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/auth/sessions/${id}`, { withCredentials: true })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
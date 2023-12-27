import base from './base'
import { UserLogin, UserRegister, refreshProps, logoutProps } from '@interfaces/User'

export const login = (data: UserLogin) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/login', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const register = (data: UserRegister) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/register', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const refreshSession = ({ refreshToken }: refreshProps) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/refresh', { refreshToken })
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

export const logoutUser = ({ refreshToken }: logoutProps) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/auth/logout', { refreshToken })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
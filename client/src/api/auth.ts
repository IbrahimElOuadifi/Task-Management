import base from './base'
import { UserLogin, UserRegister } from '@interfaces/User'

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

export const checkSession = ({ token }: { token: string | null }) => new Promise(async (resolve, reject) => {
    try {
        console.log(token)
        const resp = await base.get('/auth/session', {}, { headers: { Authorization: `Bearer ${token || ''}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
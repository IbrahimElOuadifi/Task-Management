import base from 'api/base'
import { getMembersOptions } from '@interfaces/User'

interface getMembersParams extends getMembersOptions {
    token: string
}

export const getMembers = ({ token, ...data }: getMembersParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/members', data, { headers: { Authorization: `Bearer ${token}` } })
        resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
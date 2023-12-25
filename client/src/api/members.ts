import base from 'api/base'
import { getMembersOptions } from '@interfaces/User'

interface getMembersParams extends getMembersOptions {
    accessToken: string
}

export const getMembers = ({ accessToken, ...data }: getMembersParams) => new Promise(async (resolve, reject) => {
    try {
        console.log(data)
        const resp = await base.get('/members', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
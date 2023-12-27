import base from 'api/base'
import { getMembersOptions } from '@interfaces/User'

export const getMembers = (data: getMembersOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/members', data)
        resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
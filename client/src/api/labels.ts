import base from './base'
import { getLabelsOptions, createLabelOptions } from '@interfaces/Label'

interface getLabelsParams extends getLabelsOptions {
    accessToken: string
}

export const getLabels = ({ accessToken, ...data }: getLabelsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/labels', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})

interface createLabelParams extends createLabelOptions {
    accessToken: string
}

export const createLabel = ({ accessToken, ...data }: createLabelParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/labels', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})
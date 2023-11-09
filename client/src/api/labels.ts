import base from './base'
import { getLabelsOptions, createLabelOptions } from '@interfaces/Label'

interface getLabelsParams extends getLabelsOptions {
    token: string
}

export const getLabels = ({ token, ...data }: getLabelsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/labels', data, { headers: { Authorization: `Bearer ${token}` } })
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})

interface createLabelParams extends createLabelOptions {
    token: string
}

export const createLabel = ({ token, ...data }: createLabelParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/labels', data, { headers: { Authorization: `Bearer ${token}` } })
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})
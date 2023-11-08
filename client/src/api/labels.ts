import base from './base'
import { getLabelsOptions, createLabelOptions } from '@interfaces/Label'

interface getLabelsParams extends getLabelsOptions {
    token: string
}

export const getLabels = ({ token }: getLabelsParams) => new Promise(async (resolve, reject) => {
    try {
        const response = await base.get('/labels', { headers: { Authorization: `Bearer ${token}` } })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

interface createLabelParams extends createLabelOptions {
    token: string
}

export const createLabel = ({ token, ...data }: createLabelParams) => new Promise(async (resolve, reject) => {
    try {
        const response = await base.post('/labels', data, { headers: { Authorization: `Bearer ${token}` }
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})
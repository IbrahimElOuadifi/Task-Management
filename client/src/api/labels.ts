import base from './base'
import { getLabelsOptions, createLabelOptions } from '@interfaces/Label'

export const getLabels = (data: getLabelsOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/labels', data)
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})

export const createLabel = (data: createLabelOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/labels', data)
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})
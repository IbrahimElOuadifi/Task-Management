import base from './base'
import { getLabelsOptions, createLabelOptions, updateLabelOptions } from '@interfaces/Label'

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

export const updateLabel = ({ _id, ...data }: updateLabelOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/labels/${_id}`, data)
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})

export const deleteLabel = ({ _id }: { _id: string }) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/labels/${_id}`)
        resolve(resp)
    } catch (error) {
        reject(error)
    }
})
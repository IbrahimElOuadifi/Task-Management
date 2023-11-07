import base from './base'
import { getListOptions, getListsOptions, createListOptions, updateManyListsOptions } from '@interfaces/List'

interface getListsParams extends getListsOptions {
    token: string
}

interface getListParams extends getListOptions {
    token: string
}

interface createListParams extends createListOptions {
    token: string
}

interface updateManyListsParams extends updateManyListsOptions {
    token: string
}

export const getList = ({ id, token }: getListParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/lists/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getLists = ({ projectId, token }: getListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/lists', { projectId }, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createList = ({ token, ...data }: createListParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/lists', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyLists = ({ token, ...data }: updateManyListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/lists', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
import base from './base'
import { getListOptions, getListsOptions, createListOptions, updateManyListsOptions, updateListTitleOptions, deleteListOptions } from '@interfaces/List'

interface getListsParams extends getListsOptions {
    accessToken: string
}

interface getListParams extends getListOptions {
    accessToken: string
}

interface createListParams extends createListOptions {
    accessToken: string
}

interface updateManyListsParams extends updateManyListsOptions {
    accessToken: string
}

interface updateListTitleParams extends updateListTitleOptions {
    accessToken: string
}

interface deleteListParams extends deleteListOptions {
    accessToken: string
}

export const getList = ({ id, accessToken }: getListParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/lists/${id}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getLists = ({ projectId, accessToken }: getListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/lists', { projectId }, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createList = ({ accessToken, ...data }: createListParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/lists', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyLists = ({ accessToken, ...data }: updateManyListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/lists', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateListTitle = ({ accessToken, id, ...data }: updateListTitleParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/lists/${id}/title`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const deleteList = ({ accessToken, id }: deleteListParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/lists/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
import base from './base'
import { getListOptions, getListsOptions, createListOptions, updateManyListsOptions, updateListTitleOptions, deleteListOptions } from '@interfaces/List'

export const getList = ({ id }: getListOptions) => new Promise(async (resolve, reject) => {
    try {
        if (!id) return reject('No list id provided')
        const resp = await base.get(`/lists/${id}`)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getLists = ({ projectId }: getListsOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/lists', { projectId })
        console.log(resp.data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createList = (data: createListOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/lists', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyLists = (data: updateManyListsOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/lists', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateListTitle = ({ id, ...data }: updateListTitleOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/lists/${id}/title`, data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const deleteList = ({ id }: deleteListOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/lists/${id}`)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
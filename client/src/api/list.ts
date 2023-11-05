import base from './base'

export interface getListsParams {
    id: string
    token: string
}

export interface createListParams {
    title: string
    description?: string
    projectId: string  
}

export interface updateManyListsParams {
    lists: any[]
    projectId: string
}

export const getLists = ({ id: projectId, token }: getListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/lists', { projectId }, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getList = ({ id: listId, token }: getListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/lists/${listId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createList = ({ data, token }: { data: createListParams, token: string }) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/lists', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyLists = ({ data, token }: { data: updateManyListsParams, token: string }) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/lists', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
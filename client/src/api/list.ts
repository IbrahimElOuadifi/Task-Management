import base from './base'

interface getListsParams {
    id: string
    token: string
}

interface createListParams {
    title: string
    description?: string
    projectId: string  
    token: string | null
}


export const getLists = ({ id: projectId, token }: getListsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/lists/${projectId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
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
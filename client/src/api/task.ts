import base from './base'

interface getTasksParams {
    id: string
    token: string
}

interface createTaskParams {
    text: string
    description?: string
    listId: string
    token: string | null
}

export const getTasks = ({ id, token }: getTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/tasks/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createTask = ({token, ...data}: createTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
import { ITask } from '@interfaces/Task'
import base from './base'

export interface getTasksParams {
    id: string
    token: string
}

export interface getTaskParams {
    id: string
    token: string
}

export interface createTaskParams {
    text: string
    description?: string
    listId: string
}

export interface updateManyTasksParams {
    tasks: ITask[]
    listId: string
}

export const getTasks = ({ id: listId, token }: getTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/tasks', { listId }, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getTask = ({ id: taskId, token }: getTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/tasks/${taskId}`, {}, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createTask = ({ data, token }: { data: createTaskParams , token: string}) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyTasks = ({ data, token }: { data: updateManyTasksParams , token: string}) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
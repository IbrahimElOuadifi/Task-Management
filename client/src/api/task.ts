import base from './base'
import { getTaskOptions, getTasksOptions, createTaskOptions, updateManyTasksOptions } from '@interfaces/Task'

interface getTasksParams extends getTasksOptions {
    token: string
}

interface getTaskParams extends getTaskOptions {
    token: string
}

interface createTaskParams extends createTaskOptions {
    token: string
}

interface updateManyTasksParams extends updateManyTasksOptions {
    token: string
}

export const getTask = ({ id, token }: getTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/tasks/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getTasks = ({ listId, token }: getTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/tasks', { listId }, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createTask = ({ token, ...data }: createTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const updateManyTasks = ({ token, ...data }: updateManyTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
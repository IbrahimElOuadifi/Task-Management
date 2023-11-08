import base from './base'
import { 
    getTaskOptions,
    getTasksOptions,
    createTaskOptions,
    updateManyTasksOptions,
    deleteTaskOptions,
    moveTaskOptions,
    copyTaskOptions,
    updateTaskTextOptions,
    updateTaskDescriptionOptions,
    updateTaskDueDateOptions,
    updateTaskMemberOptions,
    updateTaskLabelOptions
} from '@interfaces/Task'

interface getTaskParams extends getTaskOptions {
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

interface getTasksParams extends getTasksOptions {
    token: string
}

export const getTasks = ({ listId, token }: getTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/tasks', { listId }, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface createTaskParams extends createTaskOptions {
    token: string
}

export const createTask = ({ token, ...data }: createTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateManyTasksParams extends updateManyTasksOptions {
    token: string
}

export const updateManyTasks = ({ token, ...data }: updateManyTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/tasks', data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface deleteTaskParams extends deleteTaskOptions {
    token: string
}

export const deleteTask = ({ id, token }: deleteTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface moveTaskParams extends moveTaskOptions {
    token: string
}

export const moveTask = ({ id, token, ...data }: moveTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/move`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface copyTaskParams extends copyTaskOptions {
    token: string
}

export const copyTask = ({ id, token, ...data }: copyTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/copy`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskTextParams extends updateTaskTextOptions {
    token: string
}

export const updateTaskText = ({ id, token, ...data }: updateTaskTextParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/text`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskDescriptionParams extends updateTaskDescriptionOptions {
    token: string
}

export const updateTaskDescription = ({ id, token, ...data }: updateTaskDescriptionParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/description`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskDueDateParams extends updateTaskDueDateOptions {
    token: string
}

export const updateTaskDueDate = ({ id, token, ...data }: updateTaskDueDateParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/dueDate`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskMemberParams extends updateTaskMemberOptions {
    token: string
}

export const updateTaskMember = ({ id, token, ...data }: updateTaskMemberParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/members`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskLabelParams extends updateTaskLabelOptions {
    token: string
}

export const updateTaskLabel = ({ id, token, ...data }: updateTaskLabelParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/labels`, data, { headers: { Authorization: `Bearer ${token}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
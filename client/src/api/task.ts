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
    getTaskMembersOptions,
    updateTaskMemberOptions,
    getTaskLabelsOptions,
    updateTaskLabelOptions
} from '@interfaces/Task'

interface getTaskParams extends getTaskOptions {
    accessToken: string
}

export const getTask = ({ id, accessToken }: getTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/tasks/${id}`, {}, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface getTasksParams extends getTasksOptions {
    accessToken: string
}

export const getTasks = ({ listId, accessToken }: getTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/tasks', { listId }, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface createTaskParams extends createTaskOptions {
    accessToken: string
}

export const createTask = ({ accessToken, ...data }: createTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/tasks', data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateManyTasksParams extends updateManyTasksOptions {
    accessToken: string
}

export const updateManyTasks = ({ accessToken, ...data }: updateManyTasksParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put('/tasks', data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface deleteTaskParams extends deleteTaskOptions {
    accessToken: string
}

export const deleteTask = ({ id, accessToken }: deleteTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.del(`/tasks/${id}`, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface moveTaskParams extends moveTaskOptions {
    accessToken: string
}

export const moveTask = ({ id, accessToken, ...data }: moveTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/move`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface copyTaskParams extends copyTaskOptions {
    accessToken: string
}

export const copyTask = ({ id, accessToken, ...data }: copyTaskParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/copy`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskTextParams extends updateTaskTextOptions {
    accessToken: string
}

export const updateTaskText = ({ id, accessToken, ...data }: updateTaskTextParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/text`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskDescriptionParams extends updateTaskDescriptionOptions {
    accessToken: string
}

export const updateTaskDescription = ({ id, accessToken, ...data }: updateTaskDescriptionParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/description`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskDueDateParams extends updateTaskDueDateOptions {
    accessToken: string
}

export const updateTaskDueDate = ({ id, accessToken, ...data }: updateTaskDueDateParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/dueDate`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface getTaskMembersParams extends getTaskMembersOptions {
    accessToken: string
}

export const getTaskMembers = ({ id, accessToken }: getTaskMembersParams) => new Promise(async (resolve, reject) => {
    try {
        if(!id) return resolve({ data: [] })
        const resp = await base.get(`/tasks/${id}/members`, {}, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskMemberParams extends updateTaskMemberOptions {
    accessToken: string
}

export const updateTaskMember = ({ id, accessToken, ...data }: updateTaskMemberParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/members`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface getTaskLabelsParams extends getTaskLabelsOptions {
    accessToken: string
}

export const getTaskLabels = ({ id, accessToken }: getTaskLabelsParams) => new Promise(async (resolve, reject) => {
    try {
        if(!id) return resolve({ data: [] })
        const resp = await base.get(`/tasks/${id}/labels`, {}, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

interface updateTaskLabelParams extends updateTaskLabelOptions {
    accessToken: string
}

export const updateTaskLabel = ({ id, accessToken, ...data }: updateTaskLabelParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.put(`/tasks/${id}/labels`, data, { headers: { Authorization: `Bearer ${accessToken}` }  })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
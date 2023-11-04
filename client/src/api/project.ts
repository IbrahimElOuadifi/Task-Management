import base from './base'

export interface getProjectsParams {
    token: string;
}

export interface createProjectParams {
    name: string;
    description?: string;
}

export const getProjects = ({ token }: getProjectsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/projects', {}, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createProject = ({ data, token }: { data: createProjectParams, token: string }) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/projects', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
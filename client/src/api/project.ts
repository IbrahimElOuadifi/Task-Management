import base from './base'

interface getProjectsParams {
    token: string;
}

interface createProjectParams {
    name: string;
    description?: string;
    token: string;
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

export const createProject = ({ token, ...data }: createProjectParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/projects', data, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
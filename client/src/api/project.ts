import base from './base'
import { getProjectsOptions, getProjectOptions, createProjectOptions } from '@interfaces/Project'


export const getProject = ({ id: projectId }: getProjectOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/projects/${projectId}`)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getProjects = ({}: getProjectsOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/projects')
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createProject = (data: createProjectOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/projects', data)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
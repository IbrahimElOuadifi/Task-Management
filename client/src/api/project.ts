import base from './base'
import { getProjectsOptions, getProjectOptions, createProjectOptions } from '@interfaces/Project'

export interface getProjectsParams extends getProjectsOptions {
    token: string;
}

export interface getProjectParams extends getProjectOptions {
    token: string;
}

export interface createProjectParams extends createProjectOptions {
    token: string;
}

export const getProject = ({ id: projectId, token }: getProjectParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/projects/${projectId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

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
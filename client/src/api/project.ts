import base from './base'
import { getProjectsOptions, getProjectOptions, createProjectOptions } from '@interfaces/Project'

export interface getProjectsParams extends getProjectsOptions {
    accessToken: string;
}

export interface getProjectParams extends getProjectOptions {
    accessToken: string;
}

export interface createProjectParams extends createProjectOptions {
    accessToken: string;
}

export const getProject = ({ id: projectId, accessToken }: getProjectParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/projects/${projectId}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getProjects = ({ accessToken }: getProjectsParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get('/projects', {}, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const createProject = ({ accessToken, ...data }: createProjectParams) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.post('/projects', data, { headers: { Authorization: `Bearer ${accessToken}` } })
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})
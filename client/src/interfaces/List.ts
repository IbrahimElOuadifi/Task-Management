import { ITask } from './Task.js'

export interface IList {
    _id: string;
    title: string;
    description: string;
    index: number;
    tasks?: ITask[];
    project: string; 
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface getListOptions {
    id: string
}

export interface getListsOptions {
    projectId: string
}

export interface createListOptions {
    title: string
    description?: string
    projectId: string  
}

export interface updateManyListsOptions {
    lists: IList[]
    projectId: string
}

export interface updateListTitleOptions {
    title: string | Boolean
    id: string
}

export interface deleteListOptions {
    id: string
}
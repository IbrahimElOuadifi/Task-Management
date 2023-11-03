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
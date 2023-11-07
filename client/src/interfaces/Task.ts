export interface ITask {
    _id: string;
    text: string;
    description: string;
    index: number;
    list: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface getTasksOptions {
    listId: string
}

export interface getTaskOptions {
    id: string
}

export interface createTaskOptions {
    text: string
    description?: string
    listId: string
}

export interface updateManyTasksOptions {
    tasks: ITask[]
    listId: string
}
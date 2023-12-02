export interface ITask {
    _id: string;
    text: string;
    description: string;
    dueDate: string | null;
    index: number;
    listId: string;
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

export interface deleteTaskOptions {
    id: string
}

export interface moveTaskOptions {
    id: string
    listId: string
}

export interface copyTaskOptions {
    id: string
    listId: string
}

export interface updateTaskTextOptions {
    id: string
    text: string
}

export interface updateTaskDescriptionOptions {
    id: string
    description: string
}

export interface updateTaskDueDateOptions {
    id: string
    dueDate: Date
}

export interface getTaskMembersOptions {
    id: string
}

export interface updateTaskMemberOptions {
    id: string
    memberId: string
}

export interface getTaskLabelsOptions {
    id: string
}

export interface updateTaskLabelOptions {
    id: string
    labelId: string
}
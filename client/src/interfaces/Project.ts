export interface IProject {
    _id: string;
    name: string;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface getProjectOptions {
    id: string;
}

export interface getProjectsOptions {
    
}

export interface createProjectOptions {
    name: string;
    description?: string;
}
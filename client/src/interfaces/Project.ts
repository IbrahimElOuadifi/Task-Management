export interface IProject {
    _id: string;
    name: string;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt?: Date;
}
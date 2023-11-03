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
import { Schema, model, Document } from 'mongoose'

export interface ITask_Member extends Document {
    taskId: string;
    memberId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const task_memberSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    memberId: {
        type: Schema.Types.ObjectId,
        ref: 'Label',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
})

export default model<ITask_Member>('Task_Member', task_memberSchema)
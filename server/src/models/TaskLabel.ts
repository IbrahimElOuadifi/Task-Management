import { Schema, model, Document } from 'mongoose'

export interface ITaskLabel extends Document {
    taskId: string;
    labelId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const task_labelSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    labelId: {
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

export default model<ITaskLabel>('Task_Label', task_labelSchema)
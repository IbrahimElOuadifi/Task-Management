import { Schema, model, Document } from 'mongoose'

export interface ITask extends Document {
    text: string;
    description: string;
    index: number;
    List: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const taskSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    index: {
        type: Number,
        required: true,
        min: 0,
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
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

export default model<ITask>('Task', taskSchema)
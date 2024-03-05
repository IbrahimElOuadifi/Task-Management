import { Schema, model, Document } from 'mongoose'
import { ITask } from './Task.js'

export interface IList extends Document {
    title: string;
    description: string;
    index: number;
    tasks?: ITask[];
    projectId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const listSchema = new Schema({
    title: {
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
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
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

export default model<IList>('List', listSchema)
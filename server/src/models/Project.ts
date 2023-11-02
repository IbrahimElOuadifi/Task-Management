import { Schema, model, Document } from 'mongoose'

export interface IProject extends Document {
    name: string;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt?: Date;
}

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    owner: {
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

export default model<IProject>('Project', projectSchema)
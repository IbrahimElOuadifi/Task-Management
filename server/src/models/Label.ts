import { Schema, model, Document } from 'mongoose'

export interface ILabel extends Document {
    name: string;
    color: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const labelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#000000',
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

export default model<ILabel>('Label', labelSchema)
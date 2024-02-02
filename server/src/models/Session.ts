import { Schema, model, Document } from 'mongoose'

export interface ISession extends Document {
    user: string;
    token: string;
    ip: string;
    userAgent: string;
    createdAt: Date;
    updatedAt?: Date;
}

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
})

export default model<ISession>('Session', sessionSchema)
import { Schema, model, Document } from 'mongoose'

export interface ISession extends Document {
    userId: string;
    token: string;
    createdAt: Date;
    updatedAt?: Date;
}

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
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
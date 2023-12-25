import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    role: [string];
    createdAt: Date;
    updatedAt?: Date;
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user',
    }
})

export default model<IUser>('User', userSchema)
import { Request, Response, NextFunction } from 'express'
import { User, IUser } from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export interface RequestWithUser extends Request {
    user?: IUser;
}

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Unauthorized' })
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret')
        console.log(decoded)
        const user = await User.findById(decoded.id)
        // const user = await User.findById(decoded.id, { password: 0 })
        if (!user) return res.status(401).json({ message: 'Unauthorized' })
        req.user = user
        next()
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}

export const passwordMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) return res.status(401).json({ message: 'Unauthorized' })
        const { confirmPassword } = req.body
        if (!confirmPassword) return res.status(400).json({ message: 'Please enter a password' })
        const isMatch = await bcryptjs.compare(confirmPassword, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Passwords do not match' })
        next()
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}
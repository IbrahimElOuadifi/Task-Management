import { Request, Response, NextFunction } from 'express'
import { User, IUser } from '../models/index.js'
import jwt from 'jsonwebtoken'

export interface RequestWithUser extends Request {
    user?: IUser;
}

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ message: 'Unauthorized' })
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret')
        console.log(decoded)
        const user = await User.findById(decoded.id, { password: 0 })
        if (!user) return res.status(401).json({ message: 'Unauthorized' })
        req.user = user
        next()
    } catch (error: any) {
        res.status(401).json({ message: error.message })
    }
}
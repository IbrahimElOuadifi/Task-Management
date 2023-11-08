import { Request, Response } from 'express'
import { User } from '../models/index.js'

export const getMembers = async (req: Request, res: Response) => {
    try {
        const members = await User.find()
        res.status(200).json({ members })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
import { Request, Response } from 'express'
import { User } from '../models/index.js'

export const getMembers = async (req: Request, res: Response) => {
    try {
        const { query, limit, page } = req.query
        if(!limit || !page) return res.status(400).json({ message: 'Limit and page are required' })
        if(isNaN(Number(limit)) || isNaN(Number(page))) return res.status(400).json({ message: 'Limit and page must be numbers' })
        if(Number(limit) <= 0 || Number(limit) > 100) return res.status(400).json({ message: 'Limit must be between 1 and 100' })
        if(Number(page) <= 0) return res.status(400).json({ message: 'Page must be greater than 0' })
        const members = await User.find({
            $or: [
                { username: { $regex: query as string || '', $options: 'i' } },
                { firstName: { $regex: query as string || '', $options: 'i' } },
                { lastName: { $regex: query as string || '', $options: 'i' } }
            ]
        }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit))
        const count = await User.countDocuments()
        res.status(200).json({
            results: members.map(({ _id, username, firstName, lastName }) => ({ _id, username, firstName, lastName })),
            count,
        })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
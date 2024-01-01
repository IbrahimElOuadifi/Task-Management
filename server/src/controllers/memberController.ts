import { Request, Response } from 'express'
import { User } from '../models/index.js'

export const getMembers = async (req: Request, res: Response) => {
    try {
        const { query, limit, page } = req.query
        if(query || limit || page) {
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
        } else {
            const members = await User.find()
                // .populate({
                //     path: 'sessions',
                //     model: 'Model'
                // })
                // .exec()
            res.status(200).json(members.map(({ _id, username, firstName, lastName }) => ({ _id, username, firstName, lastName })))
        }
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
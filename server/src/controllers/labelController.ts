import { Request, Response } from 'express'
import { RequestWithUser } from '../middleware/auth.js'
import { Label } from '../models/index.js'
import yup from 'yup'

const labelSchema = yup.object().shape({
    name: yup.string().required(),
    color: yup.string().required(),
})

export const getLabels = async (req: Request, res: Response) => {
    try {
        const { query, limit, page } = req.query
        if(!limit || !page) return res.status(400).json({ message: 'Limit and page are required' })
        if(isNaN(Number(limit)) || isNaN(Number(page))) return res.status(400).json({ message: 'Limit and page must be numbers' })
        if(Number(limit) <= 0 || Number(limit) > 100) return res.status(400).json({ message: 'Limit must be between 1 and 100' })
        if(Number(page) <= 0) return res.status(400).json({ message: 'Page must be greater than 0' })
        const labels = await Label.find({ name: { $regex: query as string || '', $options: 'i' } }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit))
        const count = await Label.countDocuments()
        res.status(200).json({
            results: labels,
            count,
        })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const createLabel = async (req: RequestWithUser, res: Response) => {
    try {
        const { name, color } = req.body
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        await labelSchema.validate({ name, color })
        const label = new Label({
            name,
            color,
            createdBy: user,
        })
        const resp = await label.save()
        res.status(201).json(resp)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
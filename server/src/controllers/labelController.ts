import { Request, Response } from 'express'
import { RequestWithUser } from '../middlewares/auth.js'
import { Label } from '../models/index.js'

export const getLabels = async (req: Request, res: Response) => {
    try {
        const { query, limit, page } = req.query
        if(limit || page) {
            const labels = await Label.find({ name: { $regex: query as string || '', $options: 'i' } }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit))
            const count = await Label.countDocuments()
            res.status(200).json({
                results: labels,
                count,
            })
        } else {
            const labels = await Label.find()
            res.status(200).json(labels)
        }
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const createLabel = async (req: RequestWithUser, res: Response) => {
    try {
        const { name, color } = req.body
        const label = new Label({
            name,
            color,
            createdBy: req.user?._id
        })
        const resp = await label.save()
        res.status(201).json(resp)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const updateLabel = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params
        const { name, color } = req.body
        const label = await Label.findByIdAndUpdate(id, { name, color }, { new: true })
        res.status(200).json(label)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const deleteLabel = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params
        const label = await Label.findByIdAndDelete(id)
        res.status(200).json(label)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
import { Request, Response } from 'express'
import { Label } from '../models/index.js'
import yup from 'yup'

const labelSchema = yup.object().shape({
    name: yup.string().required(),
    color: yup.string().required(),
})

export const getLabels = async (req: Request, res: Response) => {
    try {
        const labels = await Label.find()
        res.status(200).json({ labels })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const createLabel = async (req: Request, res: Response) => {
    try {
        const { name, color } = req.body
        await labelSchema.validate({ name, color })
        const label = new Label({
            name,
            color
        })
        const resp = await label.save()
        res.status(201).json({ label: resp })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
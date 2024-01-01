import { Request, Response, NextFunction } from 'express'
import yup from 'yup'

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string(),
        projectId: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        projectId: yup.string().required(),
        lists: yup.array().of(yup.object().shape({
            _id: yup.string().required(),
            projectId: yup.string().required(),
            index: yup.number().required(),
        }))
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdateTitle = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        title: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
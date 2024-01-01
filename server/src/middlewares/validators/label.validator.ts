import { Request, Response, NextFunction } from 'express'
import yup from 'yup'


export const validateGetMany = async (req: Request, res: Response, next: NextFunction) => {

    const schema = yup.object().shape({
        query: yup.string().optional(),
        limit: yup.number().required().min(1).max(100),
        page: yup.number().required().min(1),
    })
    
    try {
        const { query, limit, page } = req.query
        if (page || limit) await schema.validate({ query, limit, page })
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {

    const schema = yup.object().shape({
        name: yup.string().required(),
        color: yup.string().required(),
    })
    
    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
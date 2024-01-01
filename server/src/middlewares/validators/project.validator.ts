import { Request, Response, NextFunction } from 'express'
import yup from 'yup'

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
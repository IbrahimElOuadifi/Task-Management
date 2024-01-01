import { Request, Response, NextFunction } from 'express'
import yup from 'yup'

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        text: yup.string().required(),
        description: yup.string(),
        listId: yup.string().required(),
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
        listId: yup.string().required(),
        tasks: yup.array().of(yup.object().shape({
            _id: yup.string().required(),
            listId: yup.string().required(),
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

export const validateUpdateText = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        text: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdateDescription = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
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

export const validateUpdateDueDate = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        dueDate: yup.date(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdateMember = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        memberId: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdateLabel = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        labelId: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    }
    catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateMove = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        listId: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateCopy = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        listId: yup.string().required(),
    })

    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
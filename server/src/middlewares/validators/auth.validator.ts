import { Request, Response, NextFunction } from 'express'
import yup from 'yup'


export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required().min(3).max(8),
        password: yup.string().required().min(6).max(256),
        confirmPassword: yup.string().required(),
    })
    try {
        const { firstName, lastName, username, password, confirmPassword } = req.body
        await schema.validate({ firstName, lastName, username, password, confirmPassword })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    try {
        const { username, password } = req.body
        await schema.validate({ username, password })
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateRefresh = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({})
    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateLogout = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({})
    try {
        await schema.validate(req.body)
        console.log('logout')
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
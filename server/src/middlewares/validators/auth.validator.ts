import { Request, Response, NextFunction } from 'express'
import yup from 'yup'


export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required().min(3).max(8),
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(256),
        confirmPassword: yup.string().required(),
    })
    try {
        const { firstName, lastName, username, email, password, confirmPassword } = req.body
        await schema.validate({ firstName, lastName, username, email, password, confirmPassword })
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
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        newPassword: yup.string().required().min(6).max(256),
        confirmPassword: yup.string().required().oneOf([yup.ref("newPassword")], "Passwords must match"),
    })
    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const validateUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        firstName: yup.string().optional(),
        lastName: yup.string().optional(),
        username: yup.string().optional().min(3).max(8),
        email: yup.string().email().optional(),
        confirmPassword: yup.string().required(),
    })
    try {
        await schema.validate(req.body)
        next()
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
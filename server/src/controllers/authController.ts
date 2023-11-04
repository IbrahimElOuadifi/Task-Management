import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import yup from 'yup'
import { User } from '../models/index.js'
import { RequestWithUser } from '../middleware/auth.js'

const registerSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required().min(3).max(8),
    password: yup.string().required().min(6).max(256),
    confirmPassword: yup.string().required(),
})

const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, password, confirmPassword } = req.body
        await registerSchema.validate({ firstName, lastName, username, password, confirmPassword })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })
        const user = await User.findOne({ username: { $regex: username.trim(), $options: 'i' } })
        if (user) return res.status(400).json({ message: 'User already exists' })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            username: username.trim(),
            password: hashedPassword,
        })
        const resp = await newUser.save()
        const token = jwt.sign({ id: resp._id }, process.env.JWT_SECRET_KEY || 'secret', { expiresIn: '1h' })
        res.status(201).json({ token })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body, process.env.JWT_SECRET_KEY)
        const { username, password } = req.body
        await loginSchema.validate({ username, password })
        const user = await User.findOne({ username: { $regex: username.trim(), $options: 'i' } })
        if (!user) return res.status(400).json({ message: 'User does not exist' })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || 'secret', { expiresIn: '1h' })
        res.status(200).json({ token })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const session = async (req: Request, res: Response) => {
    try {
        const user = (req as RequestWithUser).user
        res.status(200).json({ user })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

import 'dotenv/config.js'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, Session } from '../models/index.js'
import { RequestWithUser } from '../middlewares/auth.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '5s'
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d'

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, password } = req.body
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
        const refreshToken = jwt.sign({ id: resp._id }, JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION })
        const session = new Session({
            userId: resp._id,
            token: refreshToken,
        })
        await session.save()
        const accessToken = jwt.sign({ id: resp._id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION })
        res.status(201).json({ accessToken, refreshToken, user: resp })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: { $regex: username.trim(), $options: 'i' } })
        if (!user) return res.status(400).json({ message: 'User does not exist' })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION })
        const session = new Session({
            userId: user._id,
            token: refreshToken,
        })
        await session.save()
        const accessToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION })
        res.status(200).json({ accessToken, refreshToken, user })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET_KEY)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }
        const session = await Session.findOne({ token: refreshToken, userId: user._id  })
        if (!session) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }
        const accessToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION })
        res.status(200).json({ accessToken, user })
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

export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET_KEY)
        const session = await Session.findOneAndDelete({ token: refreshToken, userId: decoded.id })
        if (!session) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }
        res.status(200).json({ message: 'Logout successful' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
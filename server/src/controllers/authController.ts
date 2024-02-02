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
        const { firstName, lastName, username, email, password } = req.body
        const user = await User.findOne({ username: { $regex: username.trim(), $options: 'i' } })
        if (user) return res.status(400).json({ message: 'User already exists' })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword,
        })
        const resp = await newUser.save()
        const refreshToken = jwt.sign({ id: resp._id }, JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION })
        const session = new Session({
            user: resp._id,
            token: refreshToken,
            userAgent: req.headers['user-agent'],
            ip: req.ip || req.headers['x-forwarded-for']
        })
        await session.save()
        const accessToken = jwt.sign({ id: resp._id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict' })
        res.status(201).json({ accessToken, user: {...resp.toJSON(), password: undefined } })
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
        const isMatch = await bcrypt.compare(password, user.password!)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION })
        const session = new Session({
            user: user._id,
            token: refreshToken,
            userAgent: req.headers['user-agent'],
            ip: req.ip || req.headers['x-forwarded-for']
        })
        await session.save()
        const accessToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict' })
        res.status(200).json({ accessToken, user: {...user.toJSON(), password: undefined } })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies
        if(!refreshToken) return res.status(401).json({ message: 'No refresh token' })
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET_KEY)
        const user = await User.findById(decoded.id, { password: 0 })
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }
        const session = await Session.findOne({ token: refreshToken, user: user._id  })
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

export const session = async (req: RequestWithUser, res: Response) => {
    try {
        res.status(200).json({ user: {...req.user!.toJSON(), password: undefined } })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET_KEY)
        await Session.findOneAndDelete({ token: refreshToken, userId: decoded.id })
        res.clearCookie('refreshToken')
        res.status(200).json({ message: 'Logout successful' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    } finally {
    }
}

export const updatePassword = async (req: RequestWithUser, res: Response) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body
        const isMatch = await bcrypt.compare(oldPassword, req.user!.password!)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
        if (newPassword!== confirmPassword) return res.status(400).json({ message: 'Passwords must match' })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        await User.findByIdAndUpdate(req.user!._id, { password: hashedPassword })
        res.status(200).json({ message: 'Password updated' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const updateProfile = async (req: RequestWithUser, res: Response) => {
    try {
        const { firstName, lastName, username, avatar, email } = req.body
        if (username && username.trim()!== req.user!.username) {
            const user = await User.findOne({ username: { $regex: username.trim(), $options: 'i' } })
            if (user) return res.status(400).json({ message: 'User already exists' })
        }
        await User.findByIdAndUpdate(req.user!._id, { firstName, lastName, username: username.trim(), avatar, email })
        res.status(200).json({ message: 'Profile updated' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const updateProfilePic = async (req: RequestWithUser, res: Response) => {
    try {
        const { path } = req.file as Express.Multer.File
        console.log(path)
        await User.findByIdAndUpdate(req.user!._id, { avatar: path })
        res.status(200).json({ message: 'Profile picture updated' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const getSessions = async (req: RequestWithUser, res: Response) => {
    try {
        const { refreshToken } = req.cookies
        const sessions = await Session.find({ user: req.user!._id }).populate({ path: 'user', select: '-password' })
        res.status(200).json(sessions.map(s => ({...s.toJSON(), current: s.token === refreshToken })))
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const deleteSession = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params
        const { refreshToken } = req.cookies
        const userId = req.user!._id
        const session = await Session.findOne({ _id: id, user: userId })
        if (!session) return res.status(403).json({ message: 'Invalid session' })
        else if(session.token === refreshToken) return res.status(400).json({ message: 'Cannot delete current session' })
        await session.deleteOne()
        res.status(200).json({ message: 'Session deleted' })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
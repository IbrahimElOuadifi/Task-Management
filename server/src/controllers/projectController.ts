import { Response } from 'express'
import yup from 'yup'
import { RequestWithUser } from '../middlewares/auth.js'
import { Project } from '../models/index.js'

export const getProjects = async (req: RequestWithUser, res: Response) => {
    try {
        const projects = await Project.find({ ownerId: req.user?._id })
        res.json(projects)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getProject = async (req: RequestWithUser, res: Response) => {
    try {
        const project = await Project.findById(req.params.id)
        res.json(project)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const createProject = async (req: RequestWithUser, res: Response) => {
    try {
        const { name, description } = req.body
        const project = new Project({
            name,
            description,
            ownerId: req.user!._id,
        })
        await project.save()
        res.status(201).json(project)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
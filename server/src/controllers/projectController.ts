import { Response } from 'express'
import yup from 'yup'
import { RequestWithUser } from '../middleware/auth.js'
import { Project, IProject } from '../models/index.js'

const createProjectSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
})

export const getProjects = async (req: RequestWithUser, res: Response) => {
    try {
        const projects = await Project.find({ owner: req.user?._id })
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
        const { name, description } = await createProjectSchema.validate(req.body)
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        const project = new Project({
            name,
            description,
            owner: user._id,
        })
        await project.save()
        res.status(201).json(project)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
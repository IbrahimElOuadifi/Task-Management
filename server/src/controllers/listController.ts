import { Response } from 'express'
import yup from 'yup'
import { RequestWithUser } from '../middleware/auth.js'
import { List, IList, Project } from '../models/index.js'

const createListSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    projectId: yup.string().required(),
})

export const getLists = async (req: RequestWithUser, res: Response) => {
    try {
        const { projectId } = req.query
        if (!projectId)
            return res.status(400).json({ message: 'Project id is required' })
        const lists = await List.find({ projectId }).sort({ index: 1 })
        res.json(lists)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getList = async (req: RequestWithUser, res: Response) => {
    try {
        const list = await List.findById(req.params.id)
        res.json(list)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const createList = async (req: RequestWithUser, res: Response) => {
    try {
        const { title, description, projectId } = await createListSchema.validate(req.body)
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        const ProjectIsExist = await Project.findOne({ _id: projectId, ownerId: user })
        if (!ProjectIsExist) throw new Error('Project not found')
        const index = await List.countDocuments({ projectId })
        const list = new List({
            title,
            description,
            index,
            projectId,
            createdBy: user._id,
        })
        await list.save()
        res.status(201).json(list)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const updateManyLists = async (req: RequestWithUser, res: Response) => {
    try {
        const { lists, projectId } = req.body
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        const updatedLists = await Promise.all(lists.map(async (list: IList, index: number) => {
            const { _id } = list
            const updatedList = await List.findOneAndUpdate({ _id, createdBy: user }, { index, project: projectId }, { new: true })
            return updatedList
        }))
        res.json(updatedLists)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateListTitle = async (req: RequestWithUser, res: Response) => {
    try {
        const { title } = req.body
        const list = await List.findByIdAndUpdate(req.params.id, { title }, { new: true })
        res.json(list)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteList = async (req: RequestWithUser, res: Response) => {
    try {
        const list = await List.findByIdAndDelete(req.params.id)
        res.json(list)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
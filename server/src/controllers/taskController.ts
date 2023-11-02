import { Response } from 'express'
import yup from 'yup'
import { RequestWithUser } from '../middleware/auth.js'
import { Task, ITask, List } from '../models/index.js'

const createTaskSchema = yup.object().shape({
    text: yup.string().required(),
    description: yup.string(),
    listId: yup.string().required(),
})

export const getTasks = async (req: RequestWithUser, res: Response) => {
    try {
        const tasks = await Task.find({ list: req.params.listId }).sort({ index: 1 })
        res.json(tasks)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const createTask = async (req: RequestWithUser, res: Response) => {
    try {
        const { text, listId } = await createTaskSchema.validate(req.body)
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        // const listIsExist = await List.findById(listId)
        // if (!listIsExist) throw new Error('List not found')
        console.log(listId)
        const index = await Task.countDocuments({ list: listId })
        console.log(index)
        const task = new Task({
            text,
            index,
            list: listId,
            createdBy: user._id,
        })
        await task.save()
        res.status(201).json(task)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
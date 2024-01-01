import { Response } from 'express'
import yup from 'yup'
import { RequestWithUser } from '../middlewares/auth.js'
import { User, Task, ITask, List, Label, TaskLabel, TaskMember } from '../models/index.js'

const createTaskSchema = yup.object().shape({
    text: yup.string().required(),
    description: yup.string(),
    listId: yup.string().required(),
})

export const getTasks = async (req: RequestWithUser, res: Response) => {
    try {
        const { listId } = req.query
        if (!listId)
            return res.status(400).json({ message: 'List id is required' })
        const tasks = await Task.find({ listId }).sort({ index: 1 })
        res.json(tasks)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getTask = async (req: RequestWithUser, res: Response) => {
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const createTask = async (req: RequestWithUser, res: Response) => {
    try {
        const { text, listId } = req.body

        const listIsExist = await List.findOne({ _id: listId, createdBy: req.user!._id })
        if (!listIsExist) throw new Error('List not found')
        const index = await Task.countDocuments({ listId })
        console.log(index)
        const task = new Task({
            text,
            index,
            listId,
            createdBy: req.user!._id,
        })
        await task.save()
        res.status(201).json(task)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const updateManyTasks = async (req: RequestWithUser, res: Response) => {
    try {
        const { tasks, listId } = req.body
        const user = req.user?._id
        if (!user) throw new Error('User not found')
        const updatedTasks = await Promise.all(tasks.map(async (task: ITask, index: number) => {
            const { _id } = task
            const updatedTask = await Task.findOneAndUpdate({ _id, createdBy: user }, { index, listId }, { new: true })
            return updatedTask
        }))
        res.json(updatedTasks)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTaskText = async (req: RequestWithUser, res: Response) => {
    try {
        const { text } = req.body
        const date = new Date()
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user!._id }, { text, updatedAt: date }, { new: true })
        res.json(updatedTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTaskDescription = async (req: RequestWithUser, res: Response) => {
    try {
        const { description } = req.body
        const date = new Date()
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user!._id }, { description, updatedAt: date }, { new: true })
        res.json(updatedTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTaskDueDate = async (req: RequestWithUser, res: Response) => {
    try {
        const { dueDate } = req.body
        const date = new Date()
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user!._id }, { dueDate, updatedAt: date }, { new: true })
        res.json(updatedTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getTaskMembers = async (req: RequestWithUser, res: Response) => {
    try {
        const taskMembers = await TaskMember.find({ taskId: req.params.id })
        const allMembers = await User.find({})
        const members = allMembers.filter((member) => taskMembers.find((taskMember) => taskMember.memberId.toString() === member._id.toString())).map(({ _id, firstName, lastName, username, createdAt }) => ({ _id, firstName, lastName, username, createdAt }))
        res.json(members)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTaskMembers = async (req: RequestWithUser, res: Response) => {
    try {
        const { memberId } = req.body
        const isTaskMemberExist = await TaskMember.findOne({ taskId: req.params.id, memberId })
        // delete if exist else create
        if (isTaskMemberExist) {
            const removedTask = await TaskMember.deleteOne({ taskId: req.params.id, memberId })
            res.json(removedTask)
        } else {
            const newTaskMember = new TaskMember({ taskId: req.params.id, memberId, createdBy: req.user!._id })
            await newTaskMember.save()
            res.status(201).json(newTaskMember)
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getTaskLabels = async (req: RequestWithUser, res: Response) => {
    try {
        const taskLabels = await TaskLabel.find({ taskId: req.params.id })
        const allLabels = await Label.find({})
        const labels = allLabels.filter((label) => taskLabels.find((taskLabel) => taskLabel.labelId.toString() === label._id.toString())).map(({ _id, name, color, createdAt }) => ({ _id, name, color, createdAt }))
        res.json(labels)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const updateTaskLabels = async (req: RequestWithUser, res: Response) => {
    try {
        const { labelId } = req.body
        const isTaskLabelExist = await TaskLabel.findOne({ taskId: req.params.id, labelId })
        // delete if exist else create
        if (isTaskLabelExist) {
            const removedTask = await TaskLabel.deleteOne({ taskId: req.params.id, labelId })
            res.json(removedTask)
        } else {
            const newTaskLabel = new TaskLabel({ taskId: req.params.id, labelId, createdBy: req.user!._id })
            await newTaskLabel.save()
            res.status(201).json(newTaskLabel)
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const moveTask = async (req: RequestWithUser, res: Response) => {
    try {
        const { listId } = req.body
        const listIsExist = await List.findOne({ _id: listId, createdBy: req.user!._id})
        if (!listIsExist) throw new Error('List not found')
        const index = await Task.countDocuments({ listId })
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user!._id }, { listId, index }, { new: true })
        res.json(updatedTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const copyTask = async (req: RequestWithUser, res: Response) => {
    try {
        const { listId } = req.body
        const listIsExist = await List.findOne({ _id: listId, createdBy: req.user!._id })
        if (!listIsExist) throw new Error('List not found')
        const index = await Task.countDocuments({ listId })
        const task = await Task.findById(req.params.id)
        if(!task) throw new Error('Task not found')
        const { text, description, dueDate } = task?.toJSON()
        const newTask = new Task({
            text,
            description,
            dueDate,
            index,
            listId,
            createdBy: req.user!._id
        })
        await newTask.save()
        const taskLabels = await TaskLabel.find({ taskId: req.params.id })
        const taskMembers = await TaskMember.find({ taskId: req.params.id })
        await Promise.all(taskLabels.map(async (taskLabel) => {
            const newTaskLabel = new TaskLabel({
                taskId: newTask._id,
                labelId: taskLabel.labelId,
                createdBy: req.user!._id,
            })
            await newTaskLabel.save()
        }))
        await Promise.all(taskMembers.map(async (taskMember) => {
            const newTaskMember = new TaskMember({
                taskId: newTask._id,
                memberId: taskMember.memberId,
                createdBy: req.user!._id
            })
            await newTaskMember.save()
        }))
        res.status(201).json(newTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTask = async (req: RequestWithUser, res: Response) => {
    try {
        await TaskMember.deleteMany({ taskId: req.params.id })
        await TaskLabel.deleteMany({ taskId: req.params.id })
        const removedTask = await Task.deleteOne({ _id: req.params.id, createdBy: req.user!._id })
        res.json(removedTask)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
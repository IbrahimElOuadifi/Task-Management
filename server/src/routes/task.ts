import { Router } from 'express'
import { getTasks, getTask, createTask, updateManyTasks, updateTaskText, updateTaskDescription, updateTaskDueDate, getTaskLabels, updateTaskMembers, getTaskMembers,updateTaskLabels, copyTask, moveTask, deleteTask } from '../controllers/taskController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getTasks)
router.get('/:id', authMiddleware, getTask)
router.post('/', authMiddleware, createTask)
router.put('/', authMiddleware, updateManyTasks)
router.put('/:id/text', authMiddleware, updateTaskText)
router.put('/:id/description', authMiddleware, updateTaskDescription)
router.put('/:id/dueDate', authMiddleware, updateTaskDueDate)
router.get('/:id/labels', authMiddleware, getTaskLabels)
router.put('/:id/members', authMiddleware, updateTaskMembers)
router.get('/:id/members', authMiddleware, getTaskMembers)
router.put('/:id/labels', authMiddleware, updateTaskLabels)
router.put('/:id/copy', authMiddleware, copyTask)
router.put('/:id/move', authMiddleware, moveTask)
router.delete('/:id', authMiddleware, deleteTask)

export default router
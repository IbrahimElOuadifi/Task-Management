import { Router } from 'express'
import { getTasks, getTask, createTask, updateManyTasks, updateTaskText, updateTaskDescription, updateTaskDueDate, getTaskLabels, updateTaskMembers, getTaskMembers,updateTaskLabels, copyTask, moveTask, deleteTask } from '../controllers/taskController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/', updateManyTasks)
router.put('/:id/text', updateTaskText)
router.put('/:id/description', updateTaskDescription)
router.put('/:id/dueDate', updateTaskDueDate)
router.get('/:id/labels', getTaskLabels)
router.put('/:id/members', updateTaskMembers)
router.get('/:id/members', getTaskMembers)
router.put('/:id/labels', updateTaskLabels)
router.put('/:id/copy', copyTask)
router.put('/:id/move', moveTask)
router.delete('/:id', deleteTask)

export default router
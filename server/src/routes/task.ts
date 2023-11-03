import { Router } from 'express'
import { getTasks, createTask, updateManyTasks } from '../controllers/taskController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/:listId', authMiddleware, getTasks)
router.post('/', authMiddleware, createTask)
router.put('/', authMiddleware, updateManyTasks)

export default router
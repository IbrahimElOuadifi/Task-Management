import { Router } from 'express'
import { getTasks, getTask, createTask, updateManyTasks } from '../controllers/taskController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getTasks)
router.get('/:id', authMiddleware, getTask)
router.post('/', authMiddleware, createTask)
router.put('/', authMiddleware, updateManyTasks)

export default router
import { Router } from 'express'
import { getTasks, createTask } from '../controllers/taskController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/:listId', authMiddleware, getTasks)
router.post('/', authMiddleware, createTask)

export default router
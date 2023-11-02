import { Router } from 'express'
import { getLists, createList } from '../controllers/listController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/:projectId', authMiddleware, getLists)
router.post('/', authMiddleware, createList)

export default router
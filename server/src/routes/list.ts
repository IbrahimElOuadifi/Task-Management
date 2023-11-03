import { Router } from 'express'
import { getLists, createList, updateManyLists } from '../controllers/listController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/:projectId', authMiddleware, getLists)
router.post('/', authMiddleware, createList)
router.put('/', authMiddleware, updateManyLists)

export default router
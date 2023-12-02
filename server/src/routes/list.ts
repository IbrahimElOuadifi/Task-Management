import { Router } from 'express'
import { getLists, getList, createList, updateManyLists, updateListTitle, deleteList } from '../controllers/listController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getLists)
router.get('/:id', authMiddleware, getList)
router.post('/', authMiddleware, createList)
router.put('/', authMiddleware, updateManyLists)
router.put('/:id/title', authMiddleware, updateListTitle)
router.delete('/:id', authMiddleware, deleteList)

export default router
import { Router } from 'express'
import { getLists, getList, createList, updateManyLists, updateListTitle, deleteList } from '../controllers/listController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getLists)
router.get('/:id', getList)
router.post('/', createList)
router.put('/', updateManyLists)
router.put('/:id/title', updateListTitle)
router.delete('/:id', deleteList)

export default router
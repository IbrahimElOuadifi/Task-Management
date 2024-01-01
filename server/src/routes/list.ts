import { Router } from 'express'
import { getLists, getList, createList, updateManyLists, updateListTitle, deleteList } from '../controllers/listController.js'
import { validateCreate, validateUpdate, validateUpdateTitle } from '../middlewares/validators/list.validator.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getLists)
router.get('/:id', getList)
router.post('/', validateCreate, createList)
router.put('/', validateUpdate, updateManyLists)
router.put('/:id/title', validateUpdateTitle, updateListTitle)
router.delete('/:id', deleteList)

export default router
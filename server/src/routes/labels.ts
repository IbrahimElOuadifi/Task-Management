import { Router } from 'express'
import { getLabels, createLabel, updateLabel, deleteLabel } from '../controllers/labelController.js'
import { validateCreate, validateGetMany } from '../middlewares/validators/label.validator.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', validateGetMany, getLabels)
router.post('/', validateCreate, createLabel)
router.put('/:id', updateLabel)
router.delete('/:id', deleteLabel)

export default router
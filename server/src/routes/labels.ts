import { Router } from 'express'
import { getLabels, createLabel } from '../controllers/labelController.js'
import { validateCreate, validateGetMany } from '../middlewares/validators/label.validator.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', validateGetMany, getLabels)
router.post('/', validateCreate, createLabel)

export default router
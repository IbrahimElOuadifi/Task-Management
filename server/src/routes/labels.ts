import { Router } from 'express'
import { getLabels, createLabel } from '../controllers/labelController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getLabels)
router.post('/', authMiddleware, createLabel)

export default router
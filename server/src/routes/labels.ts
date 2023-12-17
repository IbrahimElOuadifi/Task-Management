import { Router } from 'express'
import { getLabels, createLabel } from '../controllers/labelController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getLabels)
router.post('/', createLabel)

export default router
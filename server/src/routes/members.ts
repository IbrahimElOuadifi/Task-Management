import { Router } from 'express'
import { getMembers } from '../controllers/memberController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getMembers)

export default router
import { Router } from 'express'
import { getMembers } from '../controllers/memberController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getMembers)

export default router
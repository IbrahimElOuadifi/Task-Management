import { Router } from 'express'
import { getMembers } from '../controllers/memberController.js'
import { validateGetMany } from '../middlewares/validators/member.validator.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', validateGetMany, getMembers)

export default router
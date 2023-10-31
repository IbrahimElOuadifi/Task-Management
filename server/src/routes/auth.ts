import { Router } from 'express'
import { register, login, session } from '../controllers/authController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/session', authMiddleware, session)

export default router
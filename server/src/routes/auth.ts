import { Router } from 'express'
import { register, login, session, refresh, logout } from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js'
import { validateLogin, validateRegister } from '../middlewares/validators/auth.validator.js'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/session', authMiddleware, session)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router
import { Router } from 'express'
import { register, login, session, refresh, logout } from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js'
import { validateLogin, validateRegister, validateRefresh, validateLogout } from '../middlewares/validators/auth.validator.js'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/session', authMiddleware, session)
router.post('/refresh', validateRefresh, refresh)
router.post('/logout', validateLogout, logout)

export default router
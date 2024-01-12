import { Router } from 'express'
import { register, login, session, refresh, logout, updateProfile, updatePassword } from '../controllers/authController.js'
import authMiddleware, { passwordMiddleware } from '../middlewares/auth.js'
import multerMiddleware from '../middlewares/multer.js'
import { validateLogin, validateRegister, validateUpdateProfile } from '../middlewares/validators/auth.validator.js'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/session', authMiddleware, session)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.put('/profile', authMiddleware, validateUpdateProfile, passwordMiddleware, updateProfile)
router.put('/password', authMiddleware, updatePassword)


export default router
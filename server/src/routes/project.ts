import { Router } from 'express'
import { getProjects, createProject } from '../controllers/projectController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getProjects)
router.post('/', authMiddleware, createProject)

export default router
import { Router } from 'express'
import { getProjects, createProject, getProject } from '../controllers/projectController.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, getProjects)
router.get('/:id', authMiddleware, getProject)
router.post('/', authMiddleware, createProject)

export default router
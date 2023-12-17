import { Router } from 'express'
import { getProjects, createProject, getProject } from '../controllers/projectController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', createProject)

export default router
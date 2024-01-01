import { Router } from 'express'
import { getTasks, getTask, createTask, updateManyTasks, updateTaskText, updateTaskDescription, updateTaskDueDate, getTaskLabels, updateTaskMembers, getTaskMembers,updateTaskLabels, copyTask, moveTask, deleteTask } from '../controllers/taskController.js'
import { validateCopy, validateMove, validateCreate, validateUpdate, validateUpdateDescription, validateUpdateDueDate, validateUpdateLabel, validateUpdateMember, validateUpdateText } from '../middlewares/validators/task.validator.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.get("/", getTasks)
router.get("/:id", getTask)
router.post("/", validateCreate, createTask);
router.put("/", validateUpdate, updateManyTasks);
router.put("/:id/text", validateUpdateText, updateTaskText);
router.put("/:id/description", validateUpdateDescription, updateTaskDescription)
router.put("/:id/dueDate", validateUpdateDueDate, updateTaskDueDate)
router.get("/:id/labels", getTaskLabels)
router.put("/:id/members", validateUpdateMember, updateTaskMembers)
router.get("/:id/members", getTaskMembers)
router.put("/:id/labels", validateUpdateLabel, updateTaskLabels)
router.put("/:id/copy", validateCopy, copyTask)
router.put("/:id/move", validateMove, moveTask)
router.delete("/:id", deleteTask)

export default router
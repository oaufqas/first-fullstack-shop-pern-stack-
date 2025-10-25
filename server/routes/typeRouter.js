import { Router } from "express";
const router = new Router()
import typeController from "../controllers/typeConrtoller.js"
import checkRole from "../middleware/checkRoleMiddleware.js";

router.post('/', checkRole('admin'), typeController.create)
router.delete('/:name', checkRole('admin'), typeController.delType)
router.get('/', typeController.getAll)

export default router
import { Router } from "express";
const router = new Router()
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.delete('/:id', authMiddleware, userController.delUsr)
router.patch('/', authMiddleware, userController.patch)

export default router
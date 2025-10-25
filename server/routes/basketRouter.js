import { Router } from "express";
const router = new Router()
import basketController from "../controllers/basketController.js";
import authMiddleware from "../middleware/authMiddleware.js"

router.get('/', authMiddleware, basketController.getBasket)
router.post('/', authMiddleware, basketController.addToBasket)
router.delete('/', authMiddleware, basketController.delPosition)
router.delete('/:basketId', authMiddleware, basketController.clearBasket)


export default router
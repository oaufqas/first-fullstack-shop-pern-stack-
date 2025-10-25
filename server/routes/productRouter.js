import { Router } from "express";
const router = new Router()
import productController from "../controllers/productController.js"
import checkRole from "../middleware/checkRoleMiddleware.js";

router.post('/', checkRole('admin'), productController.create)
router.patch('/', checkRole('admin'), productController.changeQuantity)
router.delete('/:name', checkRole('admin'), productController.delProd)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

export default router
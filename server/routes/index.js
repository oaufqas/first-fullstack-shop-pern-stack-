import { Router } from "express";
import productRouter from './productRouter.js'
import typeRouter from './typeRouter.js'
// import brandRouter from './brandRouter.js'
import userRouter from './userRouter.js'
import basketRouter from './basketRouter.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
// router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/cart', basketRouter)

export default router
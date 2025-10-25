import { randomUUID } from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../models/models.js'
import ApiError from '../error/ApiError.js'

class ProductController {
    
    async create(req, res, next) {

        try {
            let {name, price, typeProductId, about, info, quantityInStock = 1} = req.body
            const {img} = req.files
            const dir = path.dirname(fileURLToPath(import.meta.url))
            let fileName = randomUUID() + ".jpg"
            img.mv(path.resolve(dir, '..', 'static', fileName))

            const product = await db.Products.create({name, price, typeProductId, about, quantityInStock, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                        db.Characters.create({
                        title: i.title,
                        description: i.description,
                        ProductId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {

        try {
            let {typeProductId, limit, page} = req.query
            
            page = parseInt(page) || 1
            limit = parseInt(limit) || 9
            let offset = (page - 1) * limit
            let products

            if (!typeProductId){
                products = await db.Products.findAndCountAll({limit, offset})
            } 
                
            
            if (typeProductId) {
                products = await db.Products.findAndCountAll({where: {typeProductId}, limit, offset})
            }
            return res.json(products)

        } catch (e) {
            next(ApiError.badRequest('error in get all'))
        }
    }

    async getOne(req, res, next) {

        try {
            const {id} = req.params
            const product = await db.Products.findOne({
                where: {id},
                include: [{model: db.Characters}]
            })
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest('error in get one product'))
        }
    }


    async delProd(req, res, next) {
        
        try {
            const name = req.params.name
            const deleted = await db.Products.destroy({
                where: {name}
            })

            if (deleted === 0) {
                return res.json({"Error":"Product not found"})
            }
    
            return res.json({deleted})
        } catch (e) {
            next(ApiError.badRequest('error in delete product'))
        }
    }


    async changeQuantity(req, res, next) {
        
        try {
            const {quantityInStock, name} = req.body
            const check = await db.Products.findOne({
                where: {name}
            })
    
            if (!check) {
            next(ApiError.badRequest('product not found'))
            }
    
            await db.Products.update({quantityInStock}, 
                {where: {name}})

            return res.json({"message":"the total number of products has been changed"})

        } catch (e) {
            next(ApiError.badRequest('error in changeQuantity'))
        }
    }
}

export default new ProductController()



// const dir = path.dirname(fileURLToPath(import.meta.url))
// let fileName = randomUUID() + ".jpg"
// console.log(path.resolve(dir, '..', 'static', fileName))
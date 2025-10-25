import { randomUUID } from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../models/models.js'
import ApiError from '../error/ApiError.js'

class TypeController {

    async create(req, res, next) {

        try {
            const {name, about} = req.body
            const {img} = req.files
            const dir = path.dirname(fileURLToPath(import.meta.url))
            let fileName = randomUUID() + ".jpg"
            img.mv(path.resolve(dir, '..', 'static', fileName))

            const type = await db.TypeProducts.create({name, about, img: fileName})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest('error in create types'))
        }
    }

    async getAll(req, res, next) {

        try {
            const types = await db.TypeProducts.findAll()
            return res.json(types)
        } catch (e) {
            next(ApiError.badRequest('error in get all types'))
        }
    }

    async delType(req, res, next) {
        
        try {
            const name = req.params.name
            console.log(name)
            const deleted = await db.TypeProducts.destroy({
                where: {name}
            })
    
            if (deleted === 0) {
                return res.json({"Error":"Type not found"})
            }
    
            return res.json({deleted})
        } catch (e) {
            next(ApiError.badRequest('error in delete types'))
        }
    }
}

export default new TypeController()
// import db from '../models/models.js'
// import ApiError from '../error/ApiError.js'

// class BrandController {

//     async create(req, res, next) {

//         try {
//             const {name} = req.body
//             const brand = await db.BrandProducts.create({name})
//             return res.json(brand)
//         } catch (e) {
//             next(ApiError.badRequest('error in create brand'))
//         }
//     }

//     async getAll(req, res, next) {

//         try {
//             const brands = await db.BrandProducts.findAll()
//             return res.json(brands)
//         } catch (e) {
//             next(ApiError.badRequest('error in get all brands'))
//         }
//     }

//     async delBrand(req, res, next) {
        
//         try {
//             const name = req.params.name
//             const deleted = await db.BrandProducts.destroy({
//                 where: {name}
//             })
    
//             if (deleted === 0) {
//                 return res.json({"Error":"Brand not found"})
//             }
//             return res.json({deleted})
//         } catch (e) {
//             console.log(e)
//             next(ApiError.badRequest('error in delete brands'))
//         }
//     }
// }

// export default new BrandController()
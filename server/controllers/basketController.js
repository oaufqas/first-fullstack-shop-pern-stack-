import db from '../models/models.js'
import ApiError from '../error/ApiError.js'

class BasketController {

    async getBasket(req, res, next) {

        try {
            const {userId} = req.query
    
            let basket = await db.Basket.findOne({
                where: {userId},
                include: [{
                    model: db.BasketProducts,
                    include: [{
                        model: db.Products,
                    }]
                }]
            })
    
            if (!basket) {
                basket = await db.Basket.create({userId})
            }
    
            return res.json(basket)

        } catch(e) {
            next(ApiError.badRequest('error in get basket'))
        }
    }

    async addToBasket(req, res, next) {

        try {
            let {basketId, ProductId, quantity = 1, plus, minus} = req.body
            const check = await db.BasketProducts.findOne({where: {basketId, ProductId}})

            if (!check) {
                const prodBasket = await db.BasketProducts.create({basketId, ProductId, quantity})
                return res.json(prodBasket)}

            let s = check.dataValues.quantity
                
            if (!plus && !minus) {
                let intQ = parseInt(quantity)
                intQ += s
                await db.BasketProducts.update({quantity: intQ}, 
                    {where: {id:check.dataValues.id}})
                return res.json({"message": "The item is already in the cart, the quantity has been increased"})
                
            } else if (plus && !minus) {
                
                s += 1
                await db.BasketProducts.update({quantity: s}, 
                    {where: {id:check.dataValues.id}})
                    return res.json({"message": "The quantity has been reduced"})
                    
            } else if (minus && !plus && !(s <= 1)) {
                    
                s -= 1
                await db.BasketProducts.update({quantity: s}, 
                    {where: {id:check.dataValues.id}})
                return res.json({"message": "The quantity has been increased"})
            } else {
                next(ApiError.badRequest("add/subtract error"))
            }

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    } 
    

    async delPosition(req, res, next) {

        try {
            let {basketId, ProductId} = req.query
            const check = await db.BasketProducts.findOne({where: {basketId, ProductId}})

            if(!check) {
                return res.json({"message": "product or basket not found"})

            } else {

                if (check.dataValues.basketId != req.user.id){
                    return res.json({"message":"error"})
                }
                const del = await db.BasketProducts.destroy({where: {basketId, ProductId}})
                return res.json({"message":del})
            }
        } catch(e) {
            next(ApiError.badRequest('error in delete position in cost'))
        }
    }


    async clearBasket(req, res, next) {

        try {
            let basketId = req.params.basketId
            const check = await db.BasketProducts.findOne({where: {basketId}})
            console.log(check.dataValues.basketId)
            console.log(req.user.id)

            if (check.dataValues.basketId != req.user.id){
                return res.json({"message":"error"})
            }

            if(!check) {
                return res.json({"message": "basket not found"})
            } else {
                const del = await db.BasketProducts.destroy({where: {basketId}})
                return res.json({"message":del})
            }
        } catch (e) {
            next(ApiError.badRequest('error in clear cost'))
        }
    }
}

export default new BasketController()
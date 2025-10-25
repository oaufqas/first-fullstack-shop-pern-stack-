import ApiError from "../error/ApiError.js"
import bcrypt from 'bcrypt';
import db from '../models/models.js'
import jwt from "jsonwebtoken";
import e from "cors";

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {

        try {
            const {email, password, username = '---'} = req.body
            if (!email || !password || !username) {
                return next(ApiError.badRequest('Incorrect input'))
            }
            
            const candidate = await db.User.findOne({where: {email}})
    
            if (candidate) {
                console.log("email was used")
                return next(ApiError.badRequest('User with this email already exists'))
            }
    
            const hashPassword = await bcrypt.hash(password, 6)
            const user = await db.User.create({email, password: hashPassword, username})
            await db.Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest('error in registration'))
        }

    }

    
    async login(req, res, next) {

        try {
            const {email, password} = req.body
            const user = await db.User.findOne({where: {email}})
    
            if (!user) {
                return next(ApiError.internal('User not found'))
            }
            
            let comparePassword = bcrypt.compareSync(password, user.password)
    
            if (!comparePassword) {
                return next(ApiError.internal('Incorrect password'))
            }
            
            const token = generateJwt(user.id, user.email, user.role)
            
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest('error in login'))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})

        } catch (e) {
            next(ApiError.badRequest('error in check auth'))
        }
    }


    async delUsr(req, res, next) {
        
        try {
            let id = req.params.id
            const check = await db.User.findByPk(id)

            if (!check) {
                return res.json({"message": "user not found"})
            } 

            console.log(check.dataValues.id)
            console.log(req.user.id)

            if (check.dataValues.id != req.user.id){
                return res.json({"message":"error!"})
            }
            
            await db.User.destroy({where: {id}})

            return res.json({"message":"Remove successful"})

        } catch (e) {
            console.error(e)
            next(ApiError.badRequest('error in delete user'))
        }
    }


    async patch(req, res, next) {
        try {
            let {id, email, username, password} = req.body
            const check = await db.User.findByPk(id)

            if (!check) {
                return res.json({"message": "user not found"})
            }

            if (check.dataValues.id != req.user.id){
                return res.json({"message":"error!"})
            }

            const updates = {};

            if (email) {
                const checkEmail = await db.User.findOne({where:{email}})

                if (checkEmail) {
                    return res.json({"message":"Email is already in use"})
                }
                updates.email = email
            }

            if (username) updates.username = username;
            if (password) {
                const hashPassword = await bcrypt.hash(password, 6)
                updates.password = hashPassword
            } 

            await db.User.update(updates, {where: {id}})
            const result = await db.User.findByPk(id)
            const token = generateJwt(result.dataValues.id, result.dataValues.email, result.dataValues.role)
            return res.json({token})

        } catch (e) {
            console.error(e)
            next(ApiError.badRequest('error in patch user'))
        }
    }
}

export default new UserController()
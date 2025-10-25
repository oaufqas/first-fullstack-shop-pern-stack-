import jwt from "jsonwebtoken"

function check (role) {
    return function f(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Invalid token"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        if (decoded.role !== role) {
            return res.status(403).json({message: "not enough rights"})
        }
        
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: "User is not authorized"})
    }
}
}






export default check
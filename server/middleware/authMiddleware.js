import jwt from "jsonwebtoken"

function f(req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Invalid token"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

    } catch (e) {
        return res.status(401).json({message: "User is not authorized"})
    }
}

export default f
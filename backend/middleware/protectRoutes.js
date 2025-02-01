import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(401).json({ error: 'Unauthorized, No Token Provided.' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.status(401).json({ error: 'Invalid Token' })
        // console.log(decoded) // automatic na magbibigay ng userId sa object na decoded

        let user = await User.findById(decoded.userId).select('-password')
        
        req.user = user
        next()

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error / Protect Routes." })
    }
}
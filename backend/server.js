import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//local imports
import connectDB from './config/ConnectDB.js'

//Routers
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'

//Server
import express from 'express'
const app = express()

//CORS
const allowedOrigins = process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));




//API
app.use('/api/auth', authRoutes) // for authenticating users
app.use('/api/post', postRoutes) // for post of users
app.use('/api/users', userRoutes) // for users things



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
    connectDB()
})
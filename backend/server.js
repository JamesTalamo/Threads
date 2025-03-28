import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()


//local imports
import connectDB from './config/ConnectDB.js'

//Routers
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'

//Server
import express from 'express'
import AllowedCors from './config/AllowedCors.js'
import CloudinaryConfig from './config/CloudinaryConfig.js'

//Config for cloudinary
CloudinaryConfig()

// const app = express()
import { app, server } from './config/socket.js'

//CORS
app.use(AllowedCors)

app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true }));

//API
app.use('/api/auth', authRoutes) // for authenticating users
app.use('/api/post', postRoutes) // for post of users
app.use('/api/users', userRoutes) // for users things
app.use('/api/message', messageRoutes) // for messages

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
    connectDB()
})
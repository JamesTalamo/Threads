import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL, 'http://localhost:5173']
    }
})

export { app, server }
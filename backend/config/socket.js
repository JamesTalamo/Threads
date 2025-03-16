import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
        methods: ['GET', 'POST']
    }
})



export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

//store online users
const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
    // console.log(`${socket.id} Connected`)

    const userId = socket.handshake.query.userId
    if (userId) {
        userSocketMap[userId] = socket.id;
        // console.log(`User ${userId} is now online with socket ID: ${socket.id}`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap))


    socket.on('disconnect', () => {
        // console.log(`${socket.id} Disconnected`)
    })
})

export { app, server, io }
import express from 'express'
const router = express.Router()
import { protectRoutes } from '../middleware/protectRoutes.js'
import { getAllMessages, sendMessage } from '../controller/message.controller.js'

router.get('/getAllMessage/:id', protectRoutes, getAllMessages)
router.post('/sendMessage/:id', protectRoutes, sendMessage)


export default router
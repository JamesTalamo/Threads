import express from 'express'
const router = express.Router()
import { createPost } from '../controller/post.controller.js'
import { protectRoutes } from '../middleware/protectRoutes.js'

router.post('/create', protectRoutes, createPost)


export default router
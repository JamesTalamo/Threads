import express from 'express'
const router = express.Router()
import { createPost } from '../controller/post.controller.js'
import { protectRoutes } from '../middleware/protectRoutes.js'

router.get('/create', protectRoutes, createPost)


export default router
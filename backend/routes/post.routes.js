import express from 'express'
const router = express.Router()
import { createPost, getAllPost } from '../controller/post.controller.js'
import { protectRoutes } from '../middleware/protectRoutes.js'

router.get('/all', protectRoutes, getAllPost)
router.post('/create', protectRoutes, createPost)


export default router
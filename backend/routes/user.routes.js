import express from 'express'
const router = express.Router()
import { getUserPorfile, updateUserProfile } from '../controller/user.controller.js'
import { protectRoutes } from '../middleware/protectRoutes.js'


router.get('/profile/:username', getUserPorfile)

router.post('/profile/update', protectRoutes, updateUserProfile)

export default router
import express from 'express'
const router = express.Router()
import { authLogin, authRegister, authLogout, authMe } from '../controller/auth.controller.js'
import { protectRoutes } from '../middleware/protectRoutes.js'


router.post('/register', authRegister)
router.post('/login', authLogin)

router.get('/logout', authLogout)
router.get('/me', protectRoutes, authMe)

export default router
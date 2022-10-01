import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const appLimiter = rateLimiter({
  windowMs: 15*60*1000,
  max:10,
  message:'Limited request this IP address, please try again after 15 minutes'
})

import {register, login, updateUser} from '../controllers/authController.js'
import authenticatedUser from '../middleware/auth.js'

router.route('/register').post(appLimiter, register)
router.route('/login').post(appLimiter, login)
router.route('/updateUser').patch(authenticatedUser, updateUser)

export default router
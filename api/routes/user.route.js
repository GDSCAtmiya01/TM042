import express from 'express'
import { createAdmin } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/createAdmin', createAdmin)

export default router
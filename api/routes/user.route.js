import express from 'express'
import { createAdmin, sendMaill } from '../controllers/user.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/createAdmin', createAdmin)
router.get('/sendmail', sendMaill)

export default router
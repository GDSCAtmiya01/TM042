import express from 'express'
import { createAdmin, getSingleUser, sendMaill, verifyUserAdmin } from '../controllers/user.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/createAdmin', createAdmin)
router.get('/sendmail', sendMaill)
router.get('/verifyAdmin', verifyUserAdmin)
router.get('/getuser/:username', getSingleUser)

export default router
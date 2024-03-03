import express from 'express'
import { createUniversity, getAllUniversity, updateUniversity, deleteUniversity, checkAdminCode, getOneUniversity } from '../controllers/university.controller.js'
// import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create', createUniversity)
router.get('/get', getAllUniversity)
router.patch('/update/:id', updateUniversity)
router.delete('/delete/:id', deleteUniversity)
router.post('/getadminCode', checkAdminCode)
router.get('/getone/:id', getOneUniversity)

export default router
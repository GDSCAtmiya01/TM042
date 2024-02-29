import express from 'express'
import { createUniversity, getAllUniversity, updateUniversity, deleteUniversity } from '../controllers/university.controller.js'
// import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create', createUniversity)
router.get('/get', getAllUniversity)
router.patch('/update/:id', updateUniversity)
router.delete('/delete/:id', deleteUniversity)

export default router
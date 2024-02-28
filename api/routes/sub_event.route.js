import express from 'express'
import { createCompetition, deleteCompetition, getAllCompetition, updateCompetition } from '../controllers/subevent.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create', createCompetition)
router.get('/get', getAllCompetition)
router.patch('/update/:id', updateCompetition)
router.delete('/delete/:id', deleteCompetition)

export default router
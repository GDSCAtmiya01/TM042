import express from 'express'
import { createEvent, deleteEvent, getAllEvent, updateEvent, getFilteredEvent, getEventTeams, createTeam, getDetailedEvent } from '../controllers/event.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create', createEvent)
router.get('/get', getAllEvent)
router.get('/getone/:id', getDetailedEvent)
router.get('/get/:id', getFilteredEvent)
router.patch('/update/:id',verifyAdmin, updateEvent)
router.delete('/delete/:id',verifyAdmin, deleteEvent)
router.get('/getTeams/:id', getEventTeams)
router.post('/:Eventid/createTeam', createTeam)

export default router
import express from 'express'
import { createEvent } from '../controllers/event.controller.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/create', verifyAdmin, createEvent)

export default router
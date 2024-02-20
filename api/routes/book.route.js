import express from 'express'
import { addBook, getBooks } from '../controllers/book.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add', verifyToken, addBook);
router.get('/get', getBooks);

export default router;
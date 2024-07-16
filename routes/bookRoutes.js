import express from "express";
import multer from 'multer';
import { getBooks, addBook, deleteBook } from "../controller/bookController.js"

import { verifyJWT } from "../config/jwt.js"
import multerStorage from "../db/multer.js";

const upload = multer({ storage: multerStorage });

const router = express.Router()

router.get('/', getBooks);
router.post('/add', verifyJWT, upload.single('image'), addBook);
router.delete('/delete/:id', verifyJWT, deleteBook);

export default router;
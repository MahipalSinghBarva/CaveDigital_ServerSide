import express from "express";

import { getTransaction, addTransaction, returnBook, getTransactionForUser } from "../controller/transactionController.js"
import { verifyJWT } from "../config/jwt.js"

const router = express.Router();


router.get('/', verifyJWT, getTransaction);
router.post('/borrow', verifyJWT, addTransaction);
router.post('/return/:transactionId', returnBook);
router.get('/user/:userId', verifyJWT, getTransactionForUser);

export default router
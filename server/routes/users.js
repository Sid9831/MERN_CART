import express from 'express'

const router = express.Router();

import { addUser, signIn } from '../controller/user.js';

router.post('/signUp', addUser)
router.post('/signIn', signIn)

export default router
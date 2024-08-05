import express from 'express';

import { auth } from '../middlewares/authMiddleware.js';  // Add .js extension
import { changePassword, get, login, register, update } from '../controllers/user.js';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/', auth, get);
router.put('/', auth, update);
router.put('/change-password', auth, changePassword);
export default router;

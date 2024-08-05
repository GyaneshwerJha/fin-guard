import express from 'express';
import { get, getAreaChartData, getInfoCards, getById, create, update, remove } from '../controllers/transaction.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/', auth, get);
router.get('/chart/area', auth, getAreaChartData);
router.get('/info-cards', auth, getInfoCards);
router.get('/:id', auth, getById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;
import { create, get, getById, getDonutChartData, update, remove} from '../controllers/category.js'
import express from 'express';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, create);
router.get('/', auth, get);
router.get('/chart/donut', auth, getDonutChartData);
router.get('/:id', auth, getById);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;
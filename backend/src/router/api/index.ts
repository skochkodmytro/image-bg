import { Router } from 'express';

import imageRouter from '../../features/images';
import testRouter from '../../features/test';

const router = Router();

router.use('/images', imageRouter);
router.use('/test', testRouter);

export default router;
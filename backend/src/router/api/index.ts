import { Router } from 'express';

import imageRouter from './image';
import testApi from './test-api';

const router = Router();

router.use('/images', imageRouter);
router.use('/test', testApi);

export default router;
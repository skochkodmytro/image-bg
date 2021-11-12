import { Router } from 'express';

import imageRouter from './image';

const router = Router();

router.use('/image', imageRouter);

router.get('/throw-error',  async (req, res, next) => {
    throw Error('Bad Request');
});

export default router;
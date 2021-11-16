import { Router } from 'express';

import imageRouter from './image';

const router = Router();

router.use('/images', imageRouter);

// todo move this to ./test-app router folder
router.get('/throw-error',  async (req, res, next) => {
    throw Error('Bad Request');
});

export default router;
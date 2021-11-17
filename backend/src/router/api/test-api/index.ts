import { Router } from 'express';

const router = Router();

router.get('/throw-error',  async (req, res, next) => {
    throw Error('Bad Request');
});

export default router;

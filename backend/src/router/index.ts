import { Router } from 'express';
import path from "path";

import apiRouter from './api/index';

const router = Router();

router.use('/api', apiRouter);
router.get('/',async (req,res, next) => {
    try {
        res.sendFile(path.resolve('./') + '/public/index.html');
    } catch(err) {
        next(err);
    }
});

export default router;

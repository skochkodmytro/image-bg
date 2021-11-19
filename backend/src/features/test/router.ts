import { Router } from 'express';

import * as controller from './controller';

const router = Router();

router.get('/throw-error', controller.throwError);

export default router;

import { Router } from 'express';

import * as controller from './controller';

import { getIP } from "../../middlewares/getIP";

const router = Router();

router.get('/throw-error', controller.throwError);
router.get('/check', controller.checkApp);

// for test AWS cluster
router.get('/ping', getIP, controller.ping);
router.get('/long-request', getIP, controller.longRequest);

export default router;

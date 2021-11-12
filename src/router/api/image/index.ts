import { Router } from 'express';

import * as imageController from '../../../controller/image.controller';

const router = Router();

router.post('/', imageController.saveImage);
router.delete('/:id', imageController.deleteImage);

export default router;

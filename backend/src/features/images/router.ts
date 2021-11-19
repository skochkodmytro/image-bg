import { Router } from 'express';
import multer from 'multer';

import * as controller from './controller';

const upload = multer();
const router = Router();

router.get('/', controller.getImages);
router.post('/', upload.single('image'), controller.saveImage);
router.delete('/:id', controller.deleteImage);

export default router;

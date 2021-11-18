import { Router } from 'express';
import multer from 'multer';

import * as imageController from '../../../controller/image.controller';

const upload = multer();
const router = Router();

router.get('/', imageController.getImages);
router.post('/', upload.single('image'), imageController.saveImage);
router.delete('/:id', imageController.deleteImage);

export default router;

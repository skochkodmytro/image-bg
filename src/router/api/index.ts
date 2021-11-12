import { Router } from 'express';

import Image, { IImage } from "../../models/Image";
import { ImageError } from "../../middlewares/handleError";

const router = Router();

router.post('/image', async (req , res, next) => {
    try {
        const { name } = req.body;
        const findImage = await Image.findOne({ name });

        if (findImage) {
            throw new ImageError(400, 'Image name is already exist');
        }

        const newImage: IImage = new Image({ name });
        await newImage.save();

        res.json({ image: newImage });
    } catch (e) {
        next(e);
    }
});

router.delete('/image/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            throw new ImageError(404, 'Image not found');
        }

        await image.delete();
        res.json({ msg: 'Image was delete' });
    } catch (e) {
        next(e)
    }
});

router.get('/throw-error',  async (req, res, next) => {
    throw Error('Bad Request');
});

export default router;
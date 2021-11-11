import { Router } from 'express';

import Image, { IImage } from "../../models/Image";
import { ImageError } from "../../middlewares/handleError";
import cluster from "cluster";

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
            throw new Error();
        }

        await image.delete();
        res.json({ msg: 'Image was delete' });
    } catch (e) {
        next(e)
    }
});

router.get('/slow-request', async (req, res) => {
    const startTime = new Date()
    const result = await isPrime(parseInt(req.query.number as string))
    const endTime = new Date()
    res.json({
        result,
        time: endTime.getTime() - startTime.getTime() + "ms",
    })
});

router.get('/test', async (req, res) => {
    res.json({
        msg: 'test request',
    })
});

router.get('/throw-error',  async (req, res, next) => {
    throw Error('Bad Request');
});

const isPrime = (number: number) => {
    return new Promise(resolve => {
        let isPrime = true
        for (let i = 3; i < number; i++) {

        }
        resolve(isPrime);
    })
}

export default router;
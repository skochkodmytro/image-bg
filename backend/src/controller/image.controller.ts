import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import * as fs from "fs";
import shortid from 'shortid';
import { promisify } from "util";

import Image from "../models/Image";
import { ImageError } from "../middlewares/handleError";

const writeFileAsync = promisify(fs.writeFile);
const deleteFileAsync = promisify(fs.unlink);

export const saveImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { files } = req;

        // TODO: Implement multiple images support
        if (Object.keys(files as any).length > 1) throw new ImageError(400, `Can't upload more than 1 image`);

        for (const property in files) {
            const file = files[property] as UploadedFile;
            if (file.mimetype !== 'image/jpeg') throw new ImageError(400, 'Image type must be image/jpeg');

            // todo add Rembg localhost: 5000
            const url = '/images/' + shortid.generate() + '.jpeg';

            await writeFileAsync(path.resolve('./') + '/public' + url, file.data);

            // todo why someOtherProp: 'some' is allowed ??
            const createdImgDocument = await Image.create({ name: file.name, url });

            res.json({ img: createdImgDocument });
        }
    } catch (e) {
        next(e);
    }
}

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            throw new ImageError(404, 'Image not found');
        }

        const urlForDelete = path.resolve('./') + '/public' + image.url;

        // todo read transaction problems
        await image.delete();
        await deleteFileAsync(urlForDelete);

        res.json({ msg: 'Image was deleted' });
    } catch (e) {
        next(e)
    }
}

export const getImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // todo best practise for lists implement limit = 1000, skip = 0
        const images = await Image.find({});

        res.json({ images });
    } catch(e) {
        next(e);
    }
}

import { Request, Response, NextFunction } from "express";
import { IncomingMessage } from "http";
import axios from "axios";
import FormData from 'form-data';
import path from "path";
import * as fs from "fs";
import shortid from 'shortid';
import { promisify } from "util";

import Image from "../models/Image";
import { CustomError } from "../errors";

const writeFileAsync = promisify(fs.writeFile);
const deleteFileAsync = promisify(fs.unlink);

export const saveImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { file } = req;

        if (!file) throw new CustomError(400, `Not found files`);
        if (file.mimetype !== 'image/jpeg') throw new CustomError(400, 'Image type must be image/jpeg');

        const fd = new FormData();
        await fd.append('file', file.buffer, file.originalname);

        const removedBgFromJpegStream: IncomingMessage = await axios.post(`http://localhost:5000`, fd, {
            headers: fd.getHeaders(), // return Content-Type. Without it Request was returning error
            responseType: 'stream' // without responseType: 'stream' get png with bad encoding (like this ���)
        })
            .then(data => data.data)
            .catch(e => {
                throw e;
            });

        const pngBuffer: Array<Buffer> = [];
        const url = 'images/' + shortid.generate() + '.png';

        removedBgFromJpegStream.on('data', (data: Buffer) => {
            pngBuffer.push(data);
        });

        removedBgFromJpegStream.on('error', err => {
            throw err;
        });

        removedBgFromJpegStream.on('end', async () => {
            // todo why someOtherProp: 'some' is allowed ??

            await writeFileAsync(path.resolve('./') + '/public/' + url, Buffer.concat(pngBuffer));
            const createdImgDocument = await Image.create({ name: file.originalname, url });

            res.json({ image: createdImgDocument });
        });
    } catch (e) {
        next(e);
    }
}

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            throw new CustomError(404, 'Image not found');
        }

        const urlForDelete = path.resolve('./') + '/public/' + image.url;

        // todo read transaction problems
        await image.delete();
        await deleteFileAsync(urlForDelete);

        res.json({ msg: 'Image was deleted' });
    } catch (e) {
        next(e)
    }
}

type GetImagesRequestType = Request<unknown, unknown, null, { limit: string | undefined, skip: string | undefined }>
export const getImages = async (req: GetImagesRequestType, res: Response, next: NextFunction) => {
    try {
        let limit: number = req.query.limit ? parseInt(req.query.limit) : 1000;
        let skip: number = req.query.skip ? parseInt(req.query.skip) : 0;

        if (isNaN(limit) || isNaN(skip)) throw new CustomError(400, `limit or skip must be number type`)

        const images = await Image.find({}).skip(skip).limit(limit);

        res.json({ images });
    } catch(e) {
        next(e);
    }
}

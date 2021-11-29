import { Request, Response, NextFunction } from 'express';

export const throwError = async (req: Request, res: Response) => {
    throw Error('Bad Request');
}

export const ping = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: 'success', address: req.address });
    } catch (e) {
        next(e);
    }
}

export const checkApp = async (req: Request, res: Response) => {
    res.status(200).send({ status: 'OK' });
}

export const longRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startTime = Date.now();

        while (Date.now() < startTime + 7000) {
            const endTime = Date.now();
        }

        res.json({ requestTime: Date.now() - startTime, address: req.address });
    } catch(e) {
        next(e);
    }
}

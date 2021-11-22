import { Request, Response, NextFunction } from 'express';

export const throwError = async (req: Request, res: Response) => {
    throw Error('Bad Request');
}

export const ping = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: 'success' });
    } catch (e) {
        next(e);
    }
}

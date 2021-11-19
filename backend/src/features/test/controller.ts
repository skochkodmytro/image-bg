import { Request, Response } from 'express';

export const throwError = async (req: Request, res: Response) => {
    throw Error('Bad Request');
}

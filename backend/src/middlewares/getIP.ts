import { NextFunction, Request, Response } from 'express';
import dns from 'dns';
import os from 'os';

export const getIP = (req: Request, res: Response, next: NextFunction) => {
    dns.lookup(os.hostname(), (err, address, family) => {
        if (err) {
            return next();
        }
        console.log('addr: ' + address);
        next();
    });
}

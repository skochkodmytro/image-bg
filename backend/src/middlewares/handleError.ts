import { NextFunction, Request, Response } from 'express';

import { CustomError } from "../errors";

export const handleError = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: 'Something went wrong'
        });
    }
}

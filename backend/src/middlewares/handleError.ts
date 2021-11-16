import { NextFunction, Request, Response } from 'express';


// todo remove abstract
abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract message: string;
}

// todo move to own folder
// ./errors
// ./errors/CustomError
// ./error/NetworkError
export class ImageError extends CustomError {
    statusCode = 500;
    message = 'Something went wrong';

    constructor(statusCode?: number, message?: string) {
        super();
        if (statusCode) this.statusCode = statusCode;
        if (message) this.message = message;
    }
}

// todo err: any should be Error | CustomError
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
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

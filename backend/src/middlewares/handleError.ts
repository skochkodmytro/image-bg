import { NextFunction, Request, Response } from 'express';

abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract message: string;
}

// todo move to own folder
export class ImageError extends CustomError {
    statusCode = 500;
    message = 'Something went wrong';

    // todo I would always hardcode errors for each types like ImageFormatError, ImagesMaxLengthError
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

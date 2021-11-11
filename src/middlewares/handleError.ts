import { NextFunction, Request, Response } from 'express';
// import { ErrorRequestHandler } from "express";

abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract message: string;
}

export class ImageError extends CustomError {
    statusCode: number = 500;
    message: string = 'Something went wrong';

    constructor(statusCode?: number, message?: string) {
        super();
        if (statusCode) this.statusCode = statusCode;
        if (message) this.message = message;
    }
}

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

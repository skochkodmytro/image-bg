export class CustomError extends Error {
    statusCode = 500;
    message = 'Something went wrong';

    constructor(statusCode?: number, message?: string) {
        super();
        if (statusCode) this.statusCode = statusCode;
        if (message) this.message = message;
    }
}

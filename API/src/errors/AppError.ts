export class AppError {
    public readonly message: string;
    public readonly statusCodde: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCodde = statusCode;
    }
}
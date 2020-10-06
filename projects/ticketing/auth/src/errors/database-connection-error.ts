import { CustomError } from '../errors/custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = ' Error connecting to database'; 
    constructor() {
        super('[database-connection-error.ts][DatabaseConnectionError] => Error connection to database.');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}
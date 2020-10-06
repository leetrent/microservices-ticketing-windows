import { ValidationError } from 'express-validator';
import { CustomError } from '../errors/custom-error'

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('[request-validation-error.ts][RequestValidationError] =>');

        // This is required because we are extending a built-in
        // Javascript class (Error):
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map( err => {
            return { message: err.msg, field: err.param };
        });
    }
}
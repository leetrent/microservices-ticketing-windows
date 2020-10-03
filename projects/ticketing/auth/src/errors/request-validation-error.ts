import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
    
    constructor(public errors: ValidationError[]) {
        super();

        // This is required because we are extending a built-in
        // Javascript class (Error):
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}
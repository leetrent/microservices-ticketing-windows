import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
    err: Error, 
    request: Request,
    response: Response,
    next : NextFunction
) => {

    if ( err instanceof RequestValidationError ) {
        console.log("[error-handler.ts][errorHandler] => RequestValidationError");
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg, field: error.param };
        });
        return response.status(400).send({ errors: formattedErrors });
    }   
    
    if ( err instanceof DatabaseConnectionError ) {
        console.log("[error-handler.ts][errorHandler] => DatabaseConnectionError");
        return response.status(500).send({ errors: [ { message: err.reason } ] });
    }     
    
    response.status(400).send({
        errors: [ { message: 'Unexpected server-side error encountered.'} ]
    });
};
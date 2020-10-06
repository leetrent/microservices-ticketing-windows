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
        return response.status(err.statusCode).send({ errors: err.serializeErrors() });
    }   
    
    if ( err instanceof DatabaseConnectionError ) {
        return response.status(err.statusCode).send({ errors: err.serializeErrors() });
    }     
    
    response.status(400).send({
        errors: [ { message: 'Unexpected server-side error encountered.'} ]
    });
};
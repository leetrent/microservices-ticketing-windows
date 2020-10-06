import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
    err: Error, 
    request: Request,
    response: Response,
    next : NextFunction
) => {

    if ( err instanceof CustomError ) {
        return response.status(err.statusCode).send({ errors: err.serializeErrors() });
    }      
    
    response.status(400).send({
        errors: [ { message: 'Unexpected server-side error encountered.'} ]
    });
};
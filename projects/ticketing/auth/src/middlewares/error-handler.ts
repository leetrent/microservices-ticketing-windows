import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
    error: Error, 
    request: Request,
    response: Response,
    next : NextFunction
) => {

    if ( error instanceof RequestValidationError ) {
        console.log("[error-handler.ts][errorHandler] => RequestValidationError");
    }   
    
    if ( error instanceof DatabaseConnectionError ) {
        console.log("[error-handler.ts][errorHandler] => DatabaseConnectionError");
    }     
    
    response.status(400).send({
        message: error.message
    });
};
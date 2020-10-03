import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; 
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Password must be between 4 and 20 characters.")
],
(request: Request, response: Response ) => {
    const errors = validationResult(request);
    if ( errors.isEmpty() ) {
        const { emai, password } = request.body;
        throw new DatabaseConnectionError();
        response.send({});
    } else {
        throw new RequestValidationError(errors.array());
    }
});

export { router as signUpRouter };
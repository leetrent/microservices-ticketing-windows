import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; 
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Password must be between 4 and 20 characters.")
],
async (request: Request, response: Response ) => {
    const errors = validationResult(request);
    if ( !errors.isEmpty() ) {
        throw new RequestValidationError(errors.array());  
    }
    const { email, password} = request.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        console.log(`[signup.ts][HttpPost] => (email already in use): '${email}'.`)
        return response.send({});
    }
    const user = User.build({email, password});
    await user.save();
    response.status(201).send(user);
});

export { router as signUpRouter };
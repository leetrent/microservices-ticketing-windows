import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from  '../models/user';
import { Password } from '../services/password';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();    
router.post('/api/users/signin', 
[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required.')
], 
validateRequest,
async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid login credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid login credentials');
    }
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    request.session = {
        jwt: userJwt
    };
    response.status(200).send(existingUser);
});

export { router as signInRouter };
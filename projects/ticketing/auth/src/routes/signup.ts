import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'; 
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Password must be between 4 and 20 characters.")
],
validateRequest,
async (request: Request, response: Response ) => {
    const { email, password} = request.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new BadRequestError(`'${email}' is alredy in use.`);
    }
    const user = User.build({email, password});
    await user.save();

    // Generate JWT in synchronous mode:
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    // Store JWT in HTTP Session:
    request.session = {
        jwt: userJwt
    };

    response.status(201).send(user);
});

export { router as signUpRouter };
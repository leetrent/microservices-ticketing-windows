import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();
router.post('/api/users/signin', 
[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required.')
], 
validateRequest,
(request: Request, response: Response) => {
    //response.send("[signInRouter][HttpPost] =>")
});

export { router as signInRouter };
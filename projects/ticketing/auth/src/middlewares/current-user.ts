import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-validation-error';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (request: Request, response: Response, next: NextFunction) => {
  if ( !request.session?.jwt ) {
    return next();
  }
  try {
    const payload = jwt.verify(request.session.jwt, process.env.JWT_KEY!) as UserPayload;
    request.currentUser = payload;
  } catch (error) {
    console.log("[middleware][current-user.ts] => (error):", error);
  }
  next();
};
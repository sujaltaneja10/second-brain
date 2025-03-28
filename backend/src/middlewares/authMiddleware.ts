import { config } from '../config/env';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

interface DataType {
  id: string;
  username: string;
}

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  let token = req.headers['authorization'];

  // If token not provided
  if (!token) {
    res.status(400).json({ error: 'User not signed in' });
    return;
  }

  token = token.replace('Bearer ', '');

  const decodedData = jwt.verify(token, config.JWT_SECRET) as DataType;

  // If token is not correct
  if (!decodedData) {
    res.status(400).json({ error: 'User not signed in' });
    return;
  }

  req.userId = decodedData.id;
  next();
}

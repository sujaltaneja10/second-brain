import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ error: err.message || 'Internal server error' });
}

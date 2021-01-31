import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Record<symbol, string | symbol> | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Auth Token is Missing' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const user = jwt.verify(token, authConfig.secret);
    req.app.set('user', user);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid Auth Token' });
  }
}

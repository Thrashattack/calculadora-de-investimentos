/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { body } from 'express-validator';

export const rules = {
  signin: () => [body(['login', 'password'], 'is required').exists()],
  signup: () => [
    body(
      ['login', 'password', 'name', 'email', 'phone'],
      'is required',
    ).exists(),
  ],
  verify: () => [body('login', 'is required').exists()],
};

export const interceptor = (req: unknown, res: unknown, next: () => unknown) =>
  next();

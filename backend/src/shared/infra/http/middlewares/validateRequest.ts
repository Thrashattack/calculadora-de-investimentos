import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const instructions: string[] = [];

    errors.array().forEach(item => {
      if (item.msg === 'required') {
        instructions.push(`Missing required field: ${item.param}`);
      }
    });

    return res.status(400).json({ errr: 'Validation Error', instructions });
  } else {
    return next();
  }
};

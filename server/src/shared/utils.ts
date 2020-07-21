import random from 'lodash/random';
import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const generateAccountID = () => {
    let newAccountNumber: string = '';
    for (let i = 0; i < 16; i++) {
        newAccountNumber += random(9, false);
    }
    return newAccountNumber;
}

export function handleValidationErrorsMiddlware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  return next();
}

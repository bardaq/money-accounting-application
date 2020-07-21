import { Request, Response, NextFunction } from 'express';
import AccountModel from './account.dao';


export const create = (req: Request, res: Response, next: NextFunction) => {
  return AccountModel.create(req.body.balance)
    .then((accountID: string) => res.json({ accountID }))
    .catch((err: Error) => next(err));
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  return AccountModel.remove(req.query.id as string)
    .then(() => res.end())
    .catch((err: Error) => next(err));
};
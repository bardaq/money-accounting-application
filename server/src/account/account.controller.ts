import { Request, Response, NextFunction } from 'express';
import AccountDAO from './account.dao';


export const create = (req: Request, res: Response, next: NextFunction) => {
  return AccountDAO.create(req.body.balance)
    .then((accountID: string) => res.json({ accountID }))
    .catch((err: Error) => next(err));
};

export const read = (req: Request, res: Response, next: NextFunction) => {
  return AccountDAO.read(req.params.id as string)
    .then((result) => res.json(result))
    .catch((err: Error) => next(err));
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  return AccountDAO.update(req.body)
    .then((result) => res.json(result))
    .catch((err: Error) => next(err));
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  return AccountDAO.delete(req.query.id as string)
    .then(() => res.end())
    .catch((err: Error) => next(err));
};
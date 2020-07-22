import { Request, Response, NextFunction } from 'express';
import TransactionDAO from './transactions.dao';
import AccountService from '../accounts/accounts.service';


export const create = (req: Request, res: Response, next: NextFunction) => {
  const { isWithdrawal, targetAccountID, amount } = req.body;
  try {
    if (isWithdrawal) AccountService.withdrawal(targetAccountID, targetAccountID)
    else AccountService.topUp(targetAccountID, amount);
  } catch (e) {
    next(e);
  }
  return TransactionDAO.create(
    targetAccountID,
    amount,
    isWithdrawal,
  )
    .then((transactionID: string) => res.json({ id: transactionID }))
    .catch((err: Error) => next(err));
};

export const read = (req: Request, res: Response, next: NextFunction) => {
  return TransactionDAO.read(req.params.id as string)
    .then((result) => res.json(result || []))
    .catch((err: Error) => next(err));
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  return TransactionDAO.update(req.body)
    .then((result) => res.json(result))
    .catch((err: Error) => next(err));
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  return TransactionDAO.delete(req.query.id as string)
    .then(() => res.end())
    .catch((err: Error) => next(err));
};
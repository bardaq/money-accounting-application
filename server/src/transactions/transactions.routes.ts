import { Express } from 'express';
import { body, query } from 'express-validator';
import { handleValidationErrorsMiddlware } from '../shared/utils';
import { create, read, remove, update } from './transations.controller';

export default function generateTransactionsAPI(app: Express) {
  app.post(
    '/transaction',
    [
      body('targetAccountID').isString().bail().isLength({ min: 16 }),
      body('isWidhdrawal').isBoolean(),
      body('amount')
        .isNumeric()
        .bail()
        .custom(val => {
          if (val <= 0) return Promise.reject('Invalid balance. Must be > 0');
          return true;
        })
    ],
    handleValidationErrorsMiddlware,
    create
  );
  app.get(
    '/transaction/:id?',
    handleValidationErrorsMiddlware,
    read
  );
  app.post(
    '/transaction',
    [
      body('id').isString().bail().isLength({ min: 16 }),
      body('balance')
        .isNumeric()
        .bail()
        .custom(val => {
          if (val <= 0) return Promise.reject('Invalid balance. Must be > 0');
          return true;
        })
    ],
    handleValidationErrorsMiddlware,
    update
  );
  app.get(
    '/transaction/remove/:id',
    [query('id').isString().bail().isLength({ min: 16 })],
    handleValidationErrorsMiddlware,
    remove
  );
}
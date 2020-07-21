import { Express } from 'express';
import { body, query } from 'express-validator';
import { handleValidationErrorsMiddlware } from '../shared/utils';
import { create, remove } from './account.controller';

export default function generateAccountsAPI(app: Express) {
  app.post(
    '/account/create',
    [
      body('balance')
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
    '/account/remove/:id',
    [query('id').isString().bail().isLength({ min: 16 })],
    handleValidationErrorsMiddlware,
    remove
  );
}
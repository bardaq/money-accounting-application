import db from '@db/index';
import Account, { IAccount } from '@entities/Account';
import {
  withdrawalError, topUpInvalidIdError, topUpInvalidAmountError,
  withdrawalInvalidIdError, withdrawalInvalidAmountError } from '@shared/constants';

export const AccountModel = {
  create: async (balance = 0) => {
    const newAccount = new Account(balance);
    await db.insert('accounts', newAccount);
    return newAccount.id;
  },

  remove: async (id: string) => {
    const res = await db.remove('accounts', id);
    return res;
  }
}

export default AccountModel;
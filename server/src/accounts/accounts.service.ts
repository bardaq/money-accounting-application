import db from '../db/index';
import { IAccount } from './Account';
import {
  withdrawalError, topUpInvalidIdError, topUpInvalidAmountError,
  withdrawalInvalidIdError, withdrawalInvalidAmountError } from '../shared/constants';

export const AccountService = {
  topUp: async (id: string, amount: number) => {
    if (amount < 0) throw new Error(topUpInvalidIdError);
    const targetAccount = await db.select('accounts', id);
    if (!targetAccount) throw new Error(topUpInvalidAmountError);
    const newBalance = (targetAccount as IAccount).balance += amount;
    await db.update('accounts', {id, balance: newBalance});
    return newBalance;
  },

  withdrawal: async (id: string, amount: number) => {
    if (amount < 0) throw new Error(withdrawalError);
    const targetAccount: IAccount = await db.select('accounts', id) as IAccount;
    if (!targetAccount) throw new Error(withdrawalInvalidIdError);
    if (targetAccount.balance < amount) throw new Error(withdrawalInvalidAmountError);
    const newBalance = targetAccount.balance -= amount;
    await db.update('accounts', {id, balance: newBalance});
    return newBalance;
  }
}

export default AccountService;
import db from '../db/index';
import Transaction from './Transaction';

export const AccountDAO = {
  create: async (targetAccountID: string, isWithdrawal: boolean, amount: number) => {
    const newTransaction = new Transaction(targetAccountID, isWithdrawal, amount);
    await db.insert('transactions', newTransaction);
    return newTransaction.id;
  },

  read: async (id?: string) => {
    const res = db.select('transactions', id);
    return res;
  },

  update: async (newEntity: any) => {
    const res = db.update('transactions', newEntity);
    return res;
  },

  delete: async (id: string) => {
    const res = await db.remove('transactions', id);
    return res;
  }
}

export default AccountDAO;
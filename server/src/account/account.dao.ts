import db from '@db/index';
import Account from '@entities/Account';

export const AccountDAO = {
  create: async (balance = 0) => {
    const newAccount = new Account(balance);
    await db.insert('accounts', newAccount);
    return newAccount.id;
  },

  read: async (id?: string) => {
    const res = db.select('accounts', id);
    return res;
  },

  update: async (newEntity: any) => {
    const res = db.update('accounts', newEntity);
    return res;
  },

  delete: async (id: string) => {
    const res = await db.remove('accounts', id);
    return res;
  }
}

export default AccountDAO;
import { generateAccountID } from '../shared/utils';

export interface IAccount {
  id: string;
  balance: number;
}

class Account implements IAccount {
  public id: string;
  public balance: number;

  constructor(balance = 0) {
    this.id = generateAccountID();
    this.balance = balance;
  }
}

export default Account;
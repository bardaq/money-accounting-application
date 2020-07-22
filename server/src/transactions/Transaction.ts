import { v4 as uuidv4 } from 'uuid';

export interface ITransaction {
  id: string;
  targetAccountID: string;
  isWithdrawal: boolean;
  amount: number;
}

class Transaction implements ITransaction {
  public id: string;
  public targetAccountID: string;
  public isWithdrawal: boolean;
  public amount: number; // TODO: use decimal;

  constructor(targetAccountID: string, isWithdrawal: boolean, amount: number) {
    this.id = uuidv4();
    this.targetAccountID = targetAccountID;
    this.amount = amount;
    this.isWithdrawal = isWithdrawal;
  }
}

export default Transaction;
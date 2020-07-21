import { v4 as uuidv4 } from 'uuid';

export interface ITransaction {
  id: string;
  targetAccountID: string;
  isWidhdrawal: boolean;
  amount: number;
}

class Transaction implements ITransaction {
  public id: string;
  public targetAccountID: string;
  public isWidhdrawal: boolean;
  public amount: number; // TODO: use decimal;

  constructor(targetAccountID: string, isWidhdrawal: boolean, amount: number) {
    this.id = uuidv4();
    this.targetAccountID = targetAccountID;
    this.amount = amount;
    this.isWidhdrawal = isWidhdrawal;
  }
}

export default Transaction;
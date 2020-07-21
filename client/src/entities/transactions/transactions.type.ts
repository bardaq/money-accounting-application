export interface ITransaction {
    id: string;
    targetAccountID: string;
    amount: number;
    isWidthdrawal: boolean;
}
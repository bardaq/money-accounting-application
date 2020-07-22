import { config } from "process";
import { fetchAPI } from "utils";
import { ITransaction } from "./transactions.type";


export async function getAll() {
    return fetchAPI('transactions');
}

export async function getOne(id: string) {
    return fetchAPI(`transactions/${id}`);
}

export async function commitTransaction(entity: Omit<ITransaction, 'id'>) {
    return fetchAPI('transactions', entity);
}
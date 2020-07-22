import { v4 as uuidv4 } from 'uuid';
import random from 'lodash/random';

import { ITransaction } from 'src/transactions/Transaction';

export interface IStorage {
  insert: (collection: string, value: any) => Promise<any>,
  update: (collection: string, newEntity: any) => Promise<any>,
  remove: (collection: string, id: string) => Promise<boolean>,
  select: <T>(collection: string, id?: string) => Promise<T | null>,
  isLocked: boolean,
  storage: {[key: string]: any},
}

class Storage implements IStorage {
  public isLocked: boolean;
  public storage: { [key: string]: any };

  constructor(store = {}) {
    this.isLocked = false
    this.storage = store;
  }


  public insert = async (collection: string, value: any) => {
    this.#lock();
    try {
      this.storage[collection] = [
        ...this.storage[collection] as any,
        {
          id: value.id || uuidv4(),
          value
        },
      ] as any;
      this.#unlock();
      return true;
    } catch(e) {
      this.#unlock();
      throw new Error(`Failed to insert; ${e}`)
    }
  };

  public update = async (collection: string, _newEntity: any) => {
    this.#lock();
    try {
      const oldEntity = (this.storage[collection] as any[]).find((item: any) => item.id === _newEntity.id);
      const newEntity = {...oldEntity, ..._newEntity};
      const collectionWithoutOldEntity = (this.storage[collection] as any[])
        .filter((item: any) => item.id === _newEntity.id);
      this.storage[collection] = [...collectionWithoutOldEntity, newEntity] as any;
      this.#unlock();
      return newEntity;
    } catch(e) {
      this.#unlock();
      throw new Error(`Failed to insert; ${e}`)
    }
  };

  public remove = async (collection: string, id: string) => {
    this.#lock();
    try {
      this.storage[collection] = (this.storage[collection] as any[]).filter((item: any) => item.id === id) as any;
      this.#unlock();
      return true;
    } catch(e) {
      this.#unlock();
      throw new Error(`Failed to remove; ${e}`)
    }
  };

  public select = async (collection: string, id?: string) => {
    await this.#awaitUnlock();
    try {
      if (!id) return this.storage[collection] || [];
      const result = (this.storage[collection] as any[]).find((item: any) => item.id === id) || [];
      return result;
    } catch(e) {
      throw new Error(`Failed to select; ${e}`)
    }
  }

  #lock = () => {
    if (!this.isLocked) this.isLocked = true;
  }
  #unlock = () => {
    if (this.isLocked) this.isLocked = false;
  }
  #awaitUnlock = async () => {
    while(this.isLocked) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    this.isLocked = true;
  }
}

let inMemoryStorage = {};

export function initDatabase() {
  const mockStore = {
    accounts: [
      {
        id: '1234123412341234',
        balance: 100,
      },
      {
        id: '0987098709870987',
        balance: 9999,
      },
    ],
    transactions: [
      {
        id: 'd4cf1329-c533-4f2b-8dd1-a51408f12750',
        targetAccountID: '1234123412341234',
        isWithdrawal: true,
        amount: 123,
      },
      {
        id: '2976a307-7d93-4b4e-ba43-a68734671e82',
        targetAccountID: '1234123412341234',
        isWithdrawal: false,
        amount: 2332,
      },
      {
        id: 'fb7a39cc-3592-4f28-ac49-84379c1fb9d5',
        targetAccountID: '0987098709870987',
        isWithdrawal: false,
        amount: 231,
      },
      {
        id: 'd4cf1329-c533-4f2b-8dd1-a51408f12751',
        targetAccountID: '1234123412341234',
        isWithdrawal: true,
        amount: 123,
      },
      {
        id: '2976a307-7d93-4b4e-ba43-a68734671e83',
        targetAccountID: '1234123412341234',
        isWithdrawal: true,
        amount: 4343,
      },
      {
        id: 'fb7a39cc-3592-4f28-ac49-84379c1fb9d6',
        targetAccountID: '0987098709870987',
        isWithdrawal: false,
        amount: 124124,
      },
    ] as ITransaction[]
  }

  inMemoryStorage = new Storage(mockStore);

  return inMemoryStorage;
}

export default inMemoryStorage;
import { v4 as uuidv4 } from 'uuid';
import { IAccount } from '@entities/Account';

export interface IStorage {
  insert:  (collection: keyof typeof inMemoryStorage.storage, value: any) => Promise<any>,
  update:  (collection: keyof typeof inMemoryStorage.storage, newEntity: any) => Promise<any>,
  remove:  (collection: keyof typeof inMemoryStorage.storage, id: string) => Promise<boolean>,
  select:  <T>(collection: keyof typeof inMemoryStorage.storage, id?: string) => Promise<T | null>,
  storage: {
    accounts: IAccount[],
    [key: string]: any
  },
}

const inMemoryStorage: IStorage = {
  storage: {
    accounts: [],
    transactions: []
  },

  insert: async (collection: keyof typeof inMemoryStorage.storage, value: any) => {
    try {
      inMemoryStorage.storage[collection] = [
        ...inMemoryStorage.storage[collection] as any,
        {
          id: value.id || uuidv4(),
          value
        },
      ] as any;
      return true;
    } catch(e) {
      throw new Error(`Failed to insert; ${e}`)
    }
  },

  update: async (collection: keyof typeof inMemoryStorage.storage, _newEntity: any) => {
    try {
      const oldEntity = (inMemoryStorage.storage[collection] as any[]).find((item: any) => item.id === _newEntity.id);
      const newEntity = {...oldEntity, ..._newEntity};
      const collectionWithoutOldEntity = (inMemoryStorage.storage[collection] as any[])
        .filter((item: any) => item.id === _newEntity.id);
      inMemoryStorage.storage[collection] = [...collectionWithoutOldEntity, newEntity] as any;
      return newEntity;
    } catch(e) {
      throw new Error(`Failed to insert; ${e}`)
    }
  },

  remove: async (collection: keyof typeof inMemoryStorage.storage, id: string) => {
    try {
      inMemoryStorage.storage[collection] = (inMemoryStorage.storage[collection] as any[]).filter((item: any) => item.id === id) as any;
      return true;
    } catch(e) {
      throw new Error(`Failed to remove; ${e}`)
    }
  },

  select: async (collection: keyof typeof inMemoryStorage.storage, id?: string) => {
    try {
      if (!id) return inMemoryStorage.storage[collection] || [];
      const result = (inMemoryStorage.storage[collection] as any[]).find((item: any) => item.id === id) || [];
      return result;
    } catch(e) {
      throw new Error(`Failed to select; ${e}`)
    }
  }
}

export function initDatabase() {
  inMemoryStorage.storage.accounts = [
    {
      id: '1234123412341234',
      balance: 100,
    },
    {
      id: '0987098709870987',
      balance: 9999,
    },
  ];

  return inMemoryStorage;
}

export default inMemoryStorage;
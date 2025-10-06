import { JSONFile } from 'lowdb/node';
import type { LocalStorageData } from './interfaces/LocalStorageData';
import { Low } from 'lowdb';

export class LocalStorage<TypeData extends LocalStorageData> {
  private db: Low<TypeData>;

  constructor(dbName: string) {
    const adapter = new JSONFile<TypeData>(dbName);
    this.db = new Low(adapter, {} as TypeData);
  }

  public async initialize() {
    await this.db.read();
  }

  public getItem<T extends TypeData>(key: string) {
    return this.db.data[key] as T;
  }

  public async setItem(key: string, data: TypeData['']) {
    Object.assign(this.db.data, {
      [key]: data,
    });

    await this.db.write();
  }

  public async pushItem(key: string, data: TypeData['']) {
    if (this.db.data[key] === undefined) {
      Object.assign(this.db.data, {
        [key]: [],
      });
    }

    if (!Array.isArray(this.db.data[key])) {
      throw `${key} no es un arreglo.`;
    }

    this.db.data[key].push(data as never);
    await this.db.write();
  }
}

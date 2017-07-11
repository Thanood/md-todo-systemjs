import { inject } from 'aurelia-framework';
import { IStorage } from "./storage";
import { LocalStorage } from "./local-storage";

@inject(LocalStorage)
export class StorageService implements IStorage {
  constructor(private storage: IStorage) { }

  get(key: string) {
    return this.storage.get(key);
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }
}

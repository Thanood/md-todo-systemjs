import {IStorage} from './storage';

export class LocalStorage implements IStorage {
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

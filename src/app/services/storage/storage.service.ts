import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * List of JSON collections available after app loading
   * This way it's not necessary to call getCollection promise every time
   */
  public cachedCollections = [];

  /**
   * Method that adds a collection to device's app storage
   * @param key - collection key
   * @param value - collection JSON formatted as string
   */
  async setCollection(key: string, value: string) {
    await Storage.set({
      key,
      value
    });
  }

  /**
   * Method that gets a collection from the storage and automatically converts it to JSON
   * @param key - collection key used to get the JSON
   */
  async getCollection(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  /**
   * Get a list of collection keys in storage
   */
  async getStorageCollections() {
    return await Storage.keys();
  }

  /**
   * Completely clears storage
   */
  async clearStorage() {
    await Storage.clear();
  }

}

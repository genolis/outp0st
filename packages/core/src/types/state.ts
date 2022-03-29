export interface StorageConfig {
  type?: 'web3.storage' | 'nft.storage';
  token?: string;
  urlToSite?: string;
  id?: number;
}

export interface StateStorage {
  id?: number;
  cid?: string;
  title?: string;
  link?: string;
  version?: string;
}

export interface StateManager {
  storageConfigs: StorageConfig[];
  states?: StateStorage[];
  currentConfigId: number;
  currentStateId?: number;
}

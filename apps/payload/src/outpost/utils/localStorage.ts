import {
  OutpostCurrentState,
  OutpostGlobal,
  OutpostSettings
} from '@outp0st/core';

export enum SettingKey {
  outpost = 'outpost_state',
  outpostSettings = 'outpost_settings',
  outpostStateManager = 'outpost_state_manager',
}

const DefaultOutpost: OutpostGlobal = {
  test: { contracts: [], messages: [] },
  main: { contracts: [], messages: [] },
  local: { contracts: [], messages: [] },
  title: 'Default outpost state',
  current: OutpostCurrentState.TEST,
};

const DefaultOutpostSettings: OutpostSettings = { stateLoadSwitcher: false, loading: false };

export const DefaultSettings = {
  [SettingKey.outpost]: DefaultOutpost,
  [SettingKey.outpostSettings]: DefaultOutpostSettings,
};

export const getLocalSetting = <T>(key: SettingKey): T => {
  const localItem = localStorage.getItem(key);

  if (!localItem) return DefaultSettings[key] as unknown as T;

  try {
    return JSON.parse(localItem);
  } catch {
    return localItem as unknown as T;
  }
};

export const setLocalSetting = <T>(key: SettingKey, value: T) => {
  const item = typeof value === 'string' ? value : JSON.stringify(value);
  localStorage.setItem(key, item);
};

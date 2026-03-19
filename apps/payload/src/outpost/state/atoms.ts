import {
  Contract,
  ContractMessage,
  OutpostCurrentState,
  OutpostGlobal,
  OutpostMeta,
} from '@outp0st/core';
import { atom, atomFamily } from 'recoil';
import { getLocalSetting, SettingKey } from '../utils/localStorage';

const stored = getLocalSetting<OutpostGlobal>(SettingKey.outpost);

export const currentEnvAtom = atom<OutpostCurrentState>({
  key: 'outpost_currentEnv',
  default: stored.current,
});

export const globalTitleAtom = atom<string>({
  key: 'outpost_globalTitle',
  default: stored.title,
});

export const contractsAtomFamily = atomFamily<Contract[], OutpostCurrentState>({
  key: 'outpost_contracts',
  default: (env: OutpostCurrentState) => stored[env]?.contracts ?? [],
});

export const messagesAtomFamily = atomFamily<
  ContractMessage[],
  OutpostCurrentState
>({
  key: 'outpost_messages',
  default: (env: OutpostCurrentState) => stored[env]?.messages ?? [],
});

export const metaAtomFamily = atomFamily<OutpostMeta, OutpostCurrentState>({
  key: 'outpost_meta',
  default: (env: OutpostCurrentState) => {
    const envState = stored[env];
    return {
      title: envState?.title,
      version: envState?.version,
      params: envState?.params,
      isReadonly: envState?.isReadonly,
    };
  },
});

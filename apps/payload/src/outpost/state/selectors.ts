import {
  Contract,
  Outpost,
  OutpostCurrentState,
  OutpostGlobal,
} from '@outp0st/core';
import { selector } from 'recoil';
import {
  contractsAtomFamily,
  currentEnvAtom,
  globalTitleAtom,
  messagesAtomFamily,
  metaAtomFamily,
} from './atoms';

const sortContracts = (contracts: Contract[]): Contract[] =>
  [...contracts].sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

export const currentOutpostSelector = selector<Outpost>({
  key: 'outpost_currentOutpost',
  get: ({ get }) => {
    const env = get(currentEnvAtom);
    const meta = get(metaAtomFamily(env));
    const contracts = get(contractsAtomFamily(env));
    const messages = get(messagesAtomFamily(env));
    return {
      ...meta,
      contracts: sortContracts(contracts),
      messages,
    };
  },
});

export const outpostGlobalSelector = selector<OutpostGlobal>({
  key: 'outpost_global',
  get: ({ get }) => {
    const current = get(currentEnvAtom);
    const title = get(globalTitleAtom);

    const buildEnv = (env: OutpostCurrentState): Outpost => {
      const meta = get(metaAtomFamily(env));
      const contracts = get(contractsAtomFamily(env));
      const messages = get(messagesAtomFamily(env));
      return { ...meta, contracts: sortContracts(contracts), messages };
    };

    return {
      title,
      current,
      main: buildEnv(OutpostCurrentState.MAIN),
      test: buildEnv(OutpostCurrentState.TEST),
      local: buildEnv(OutpostCurrentState.LOCAL),
    };
  },
});

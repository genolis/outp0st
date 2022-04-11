import { StateManager, StateManagerService } from '@outp0st/core';
import { atom, useRecoilState } from 'recoil';
import {
  getLocalSetting,
  setLocalSetting,
  SettingKey
} from '../utils/localStorage';
import { getId } from './useOutpostState';

const initId = getId();
// const secondId = initId + 1;

const stateManager = atom({
  key: 'outpostStateManager',
  default: getLocalSetting<StateManager>(SettingKey.outpostStateManager) || {
    storageConfigs: [
      {
        id: initId,
        type: 'web3.storage',
        token: '',
        urlToSite: 'https://web3.storage/account/',
      },
      // {
      //   id: secondId,
      //   type: 'nft.storage',
      //   token: '',
      //   urlToSite: 'https://nft.storage/files/',
      // },
    ],
    states: [],
    currentConfigId: initId,
  },
});

export const useStateManager = () => {
  const [state, setState] = useRecoilState<StateManager>(stateManager);

  const updateManager = (data: StateManager) => {
    const sortedStates = [...data.states!].sort((a, b) =>
      a.id! < b.id! ? 1 : -1,
    );
    const sortedConfigs = [...data.storageConfigs]!.sort((a, b) =>
      a.id! < b.id! ? 1 : -1,
    );
    const resultState = {
      ...data,
      states: [...sortedStates],
      storageConfigs: [...sortedConfigs],
    };
    setState(resultState);
    setLocalSetting(SettingKey.outpostStateManager, resultState);
  };

  return {
    ...StateManagerService(state, updateManager),
    updateManager,
    manager: state,
  };
};

import { OutpostSettings } from '@outp0st/core';
import { atom, useRecoilState } from 'recoil';
import {
  getLocalSetting,
  setLocalSetting,
  SettingKey,
} from '../utils/localStorage';

const outpostSettings = atom({
  key: 'outpostSettings',
  default: getLocalSetting<OutpostSettings>(SettingKey.outpostSettings),
});

export const useOutpostSettings = () => {
  const [state, setState] = useRecoilState<OutpostSettings>(outpostSettings);

  const updateSettings = (settings: OutpostSettings) => {
    setState({ ...settings });
    setLocalSetting(SettingKey.outpostSettings, { ...settings });
  };

  return {
    updateSettings,
    settings: state,
  };
};

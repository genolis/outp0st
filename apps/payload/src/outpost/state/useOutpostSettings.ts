import { OutpostSettings } from '@outp0st/core';
import { atom, useRecoilState } from 'recoil';
import {
  getLocalSetting,
  setLocalSetting,
  SettingKey
} from '../utils/localStorage';

const outpostSettings = atom({
  key: 'outpostSettings',
  default: getLocalSetting<OutpostSettings>(SettingKey.outpostSettings),
});

const outpostSettingsLoading = atom({
  key: 'outpostSettingsLoading',
  default: true,
});

export const useOutpostSettings = () => {
  const [state, setState] = useRecoilState<OutpostSettings>(outpostSettings);
  const [loading, setLoading] = useRecoilState<boolean>(outpostSettingsLoading);

  const updateSettings = (settings: OutpostSettings) => {
    setState({ ...settings });
    setLocalSetting(SettingKey.outpostSettings, { ...settings });
  };

  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  }

  return {
    updateSettings,
    updateLoading,
    loading,
    settings: state,
  };
};

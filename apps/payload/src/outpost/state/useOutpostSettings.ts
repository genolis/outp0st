import { atom, useRecoilState } from "recoil"
import { getLocalSetting, setLocalSetting } from "../utils/localStorage"
import { SettingKey } from "../utils/localStorage"

import { OutpostSettings } from "./model"

const outpostSettings = atom({
  key: "outpostSettings",
  default: getLocalSetting<OutpostSettings>(SettingKey.outpostSettings),
})

export const useOutpostSettings = () => {
  const [state, setState] = useRecoilState<OutpostSettings>(outpostSettings)

  const updateSettings = (settings: OutpostSettings) => {
    setState({ ...settings })
    setLocalSetting(SettingKey.outpostSettings, { ...settings })
  }

  return {
    updateSettings,
    settings: state,
  }
}

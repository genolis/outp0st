import { getDefaultGlobalState, Outpost } from '@outp0st/core';
import { parseJSON } from 'utils/data';
import { getStateTitle } from 'utils/outpost';
import { useOutpostState } from '../state/useOutpostState';
import { getLocalSetting, SettingKey } from '../utils/localStorage';

export function useSaveLoad() {
  const { updateGlobalState } = useOutpostState();
  const saveState = () => {
    const data = getLocalSetting<Outpost>(SettingKey.outpost);

    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data, null, 2));
    var dlAnchorElem: any = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute(
      'download',
      getStateTitle(data.title, data.version),
    );
    dlAnchorElem.click();
  };
  const loadStateFromText = (lines: string, url?: string) => {
    const newState = parseJSON(lines);
    if (!newState) {
      console.error('cannot load state from text url:', url, lines);
      return;
    }
    // TODO we should create startup hook call next line should go there
    //updateOrAddParam('stateUrl', url, OutpostParamsTypes.STRING);
    updateGlobalState(newState);
  };
  // https://stackoverflow.com/questions/7346563/loading-local-json-file
  const loadState = (file: File) => {
    var fr: any;
    //console.log({ file });

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);

    function receivedText(e: any) {
      let lines = e.target.result;
      loadStateFromText(lines);
    }
  };

  const resetState = () => {
    const ok = window.confirm(
      'Are you sure, you want to reset state? All work will be erased!',
    );
    if (ok) {
      updateGlobalState(getDefaultGlobalState());
      //window.location.reload();
    }
  };
  return { saveState, loadState, resetState, loadStateFromText };
}

import { ContractMessageRenderModes } from '@outpost/core';
import { useEffect } from 'react';
import { useOutpostState } from '../state/useOutpostState';

export function useComptability() {
  const { outpost, updateState } = useOutpostState();
  useEffect(() => {
    const newOutpost = { ...outpost };
    let shoudUpdate = false;
    const newMessages = newOutpost.messages.map(message => {
      let newM = { ...message };
      if (!message.coins) {
        newM.coins = [];
        shoudUpdate = true;
      }
      if (!message.renderMode) {
        newM.renderMode = ContractMessageRenderModes.FORM;
        shoudUpdate = true;
      }
      return newM;
    });

    if (!outpost.params) {
      newOutpost.params = [];
      shoudUpdate = true;
    }

    if (shoudUpdate) updateState({ ...newOutpost, messages: [...newMessages] });
    // eslint-disable-next-line
  }, []);
}

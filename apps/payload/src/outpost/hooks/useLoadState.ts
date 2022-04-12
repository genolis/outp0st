import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useOutpostSettings } from '../state/useOutpostSettings';
import { readTextUrl } from '../utils';
import { useSaveLoad } from './useSaveLoad';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
export function useLoadState() {
  const { loadStateFromText } = useSaveLoad();
  const query = useQuery();
  const stateUrl = query.get('state');
  const { updateSettings, updateLoading, settings } = useOutpostSettings();
  useEffect(() => {
    async function ls(stateUrl: string | null) {
      if (stateUrl) {
        const state = await readTextUrl(stateUrl);
        if (!state) {
          console.error('State load failed from url:', stateUrl);
        }
        loadStateFromText(state, stateUrl);
        updateSettings({ stateLoadSwitcher: !settings.stateLoadSwitcher, loading: false });
      }
      updateLoading(false);
    }

    ls(stateUrl);
  }, []);
}

import { OutpostCurrentState } from 'types';

export function GetId() {
  return Date.now() + new Date().getMilliseconds();
}

export function getTabTitle(title: string) {
  return title.slice(0, 3).toUpperCase();
}

export function getDefaultGlobalState(title = 'Default Outpost payload title') {
  return {
    title: title,
    current: OutpostCurrentState.LOCAL,
    local: { contracts: [], messages: [] },
    test: { contracts: [], messages: [] },
    main: { contracts: [], messages: [] },
  };
}

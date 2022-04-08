import { OutpostCurrentState } from '../types';

export function GetId() {
  return Date.now() + new Date().getMilliseconds();
}

export function getTabTitle(title: string) {
  let result = '';
  let parts = title.split('_');
  if (parts && parts.length > 2) {
    parts.shift();
    result = parts.map(x => x[0].toUpperCase()).join('_');
  } else if (parts && parts.length === 2) {
    result = parts[1].slice(0, 3).toUpperCase();
  } else {
    result = title.slice(0, 3).toUpperCase();
  }
  return result;
}

export function getDefaultGlobalState(
  title = 'Default Outpost payload title!',
) {
  return {
    title: title,
    current: OutpostCurrentState.LOCAL,
    local: { contracts: [], messages: [] },
    test: { contracts: [], messages: [] },
    main: { contracts: [], messages: [] },
  };
}

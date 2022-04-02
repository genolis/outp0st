import {
  Contract,
  ContractMessage,
  getDefaultGlobalState,
  OutpostCurrentState,
  OutpostGlobal,
} from '@outpost/core';

export function generateGlobalState(
  env: OutpostCurrentState,
  data: { contract: Contract; messages: ContractMessage[] }[],
  showBanner: (msg: any) => void,
): OutpostGlobal {
  const today = new Date();
  let result: OutpostGlobal = getDefaultGlobalState(
    `Rover generated ${today.toLocaleTimeString()}`,
  );

  result[env] = {
    contracts: data.map(x => x.contract),
    messages: data.map(x => x.messages).flat(),
    title: `[${env}] ` + result.title,
  };
  return result;
}

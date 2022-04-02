import { ContractMessageTypes, OutpostGlobal } from '@outpost/core';
import fs from 'fs';
import { web3Upload } from './web3storage';

export function getOkMessages(messages: string[]) {
  return (
    messages
      .filter(
        m =>
          m.indexOf('instantiate') !== -1 ||
          m.indexOf('query') !== -1 ||
          m.indexOf('execute') !== -1,
      )
      // https://stackoverflow.com/questions/23921683/javascript-move-an-item-of-an-array-to-the-front
      .sort(function (x, y) {
        return x.indexOf('instantiate') !== -1
          ? -1
          : y.indexOf('instantiate') !== -1
          ? 1
          : 0;
      })
  );
}

export function getMessageType(m: string): ContractMessageTypes {
  if (m.indexOf('instantiate') !== -1) return ContractMessageTypes.INSTA;
  else if (m.indexOf('query') !== -1) return ContractMessageTypes.QUERY;
  else if (m.indexOf('execute') !== -1) return ContractMessageTypes.EXECUTE;
}

export async function uploadAndGenerateUrl(
  globalState: OutpostGlobal,
  web3storageToken: string,
  basePayloadUrl: string,
): Promise<string> {
  const stateUrl = await web3Upload({
    token: web3storageToken,
    type: 'json',
    json: globalState,
    title: 'rover_generated.json',
  });
  return `${basePayloadUrl}/outpost?state=${stateUrl.link}#CONFIG`;
}

export function tryReadJson(path: string) {
  try {
    const jsonString = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    return JSON.parse(jsonString);
  } catch (err) {
    //console.log(err);
    return;
  }
}

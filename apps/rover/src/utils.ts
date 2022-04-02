import { ContractMessageTypes, OutpostGlobal } from '@outpost/core';
import fs from 'fs';
import { web3Upload } from './web3storage';

export function getOkMessages(messages: string[]) {
  return messages.filter(
    m =>
      m.indexOf('instantiate') !== -1 ||
      m.indexOf('query') !== -1 ||
      m.indexOf('execute') !== -1,
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
  return `${basePayloadUrl}/outpost?state=${stateUrl}#CONFIG`;
}

export function tryReadJson(path: string) {
  try {
    const jsonString = fs.readFileSync('./customer.json', {
      encoding: 'utf-8',
    });
    return JSON.parse(jsonString);
  } catch (err) {
    //console.log(err);
    return;
  }
}

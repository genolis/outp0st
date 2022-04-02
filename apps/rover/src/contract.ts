import { Contract, ContractMessage, GetId, getTabTitle } from '@outpost/core';
import fs from 'fs';
import jsf from 'json-schema-faker';
import path from 'path';
import { processMessageSchemas } from './message';
import { getOkMessages } from './utils';
import { web3Upload } from './web3storage';

// TODO refactor id generation (guid?)
export async function getContracts(
  contractsPath: string,
  web3storageToken: string,
  artifactsPath: string,
  log: any,
) {
  jsf.option({ requiredOnly: true });
  const contracts = fs.readdirSync(contractsPath);
  let contractIdPart = 0;
  let messageIdPart = 0;
  const result = await Promise.all(
    contracts.map(x =>
      processContractsFolders(
        x,
        log,
        contractsPath,
        contractIdPart,
        messageIdPart,
        artifactsPath,
        web3storageToken,
        jsf,
      ),
    ),
  );
  return result;
}

export async function processContractsFolders(
  x: string,
  log: (string) => void,
  contractsPath: string,
  contractIdPart: number,
  messageIdPart: number,
  artifactsPath: string,
  web3storageToken: string,
  jsf: any,
) {
  log(`processing ${x} contract`);
  const schemasPath = path.join(contractsPath, x, 'schema');
  const contractId = GetId() + contractIdPart;
  contractIdPart++;
  const messageSchemas = fs.readdirSync(schemasPath);
  const messages: ContractMessage[] = getOkMessages(messageSchemas)
    .map(m =>
      processMessageSchemas(
        m,
        x,
        schemasPath,
        messageIdPart,
        log,
        contractId,
        jsf,
      ),
    )
    .flat();
  const wasmTitle = x + '.wasm';
  const afp = path.join(contractsPath, x, artifactsPath);
  log(`saving ${x} wasm to web3.storage`);
  const url = await web3Upload({
    token: web3storageToken,
    type: 'wasm',
    filepath: afp,
    title: path.join(artifactsPath, wasmTitle),
  });
  log(`${url}`);
  const contract: Contract = {
    id: contractId,
    title: x,
    binUrl: url,
    tabTitle: getTabTitle(x),
    messages: messages.map(mx => mx.id),
  };
  return { contract, messages };
}

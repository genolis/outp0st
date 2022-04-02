import { Contract, ContractMessage, GetId, getTabTitle } from '@outpost/core';
import fs from 'fs';
import path from 'path';
import { log } from './log';
import { processMessageSchemas } from './message';
import { RoverOptions } from './types';
import { getOkMessages } from './utils';
import { getLink, web3Upload } from './web3storage';

// TODO refactor id generation (guid?)
export async function getContracts(options: RoverOptions) {
  const contracts = fs.readdirSync(options.contractsPath);
  let contractIdPart = 0;
  let messageIdPart = 0;
  const result = await Promise.all(
    contracts.map(x =>
      processContractsFolders(x, contractIdPart, messageIdPart, options),
    ),
  );
  return result;
}

export async function processContractsFolders(
  contractTitle: string,
  contractIdPart: number,
  messageIdPart: number,
  options: RoverOptions,
) {
  log(`processing ${contractTitle} contract`);
  const schemasPath = path.join(options.contractsPath, contractTitle, 'schema');
  const contractId = GetId() + contractIdPart;
  contractIdPart++;
  const messageSchemas = fs.readdirSync(schemasPath);
  const messages: ContractMessage[] = getOkMessages(messageSchemas)
    .map(m =>
      processMessageSchemas(
        m,
        contractTitle,
        schemasPath,
        messageIdPart,
        contractId,
      ),
    )
    .flat();
  const wasmTitle = contractTitle + '.wasm';
  const afp = generateArtifactsPath(options, contractTitle);

  let url: string;
  if (!options.cid) {
    log(`saving ${contractTitle} wasm to web3.storage`);
    const uploaded = await web3Upload({
      token: options.web3storageToken,
      type: 'wasm',
      filepath: afp,
      title: path.join(options.artifactsPath, wasmTitle),
    });
    options.cid = uploaded.cid;
    url = uploaded.link;
  } else {
    log(`getting link for ${contractTitle}.wasm using cid: ${options.cid}`);
    url = getLink(path.join(options.artifactsPath, wasmTitle), options.cid);
  }
  log(`${url}`);
  const contract: Contract = {
    id: contractId,
    title: contractTitle,
    binUrl: url,
    tabTitle: getTabTitle(contractTitle),
    messages: messages.map(mx => mx.id),
  };
  return { contract, messages };
}

function generateArtifactsPath(options: RoverOptions, contractTitle: string) {
  let result = '';
  if (options.workspace) result = path.join(options.artifactsPath);
  else
    result = path.join(
      options.contractsPath,
      contractTitle,
      options.artifactsPath,
    );
  return result;
}

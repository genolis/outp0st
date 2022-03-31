#!/usr/bin/env node
import {
  Contract,
  ContractMessage,
  ContractMessageTypes,
  getDefaultGlobalState,
  GetId,
  getTabTitle,
  OutpostCurrentState,
  OutpostGlobal,
} from '@outpost/core';
import { Command } from 'commander';
import fs from 'fs';
import jsf from 'json-schema-faker';
import path from 'path';
import * as packgeJSON from '../../package.json';
import { showBanner } from '../banner';
import { web3Upload } from '../web3storage';

const program = new Command();

const defaultOptions: RoverOptions = {
  contractsPath: './contracts',
  artifactsPath: 'artifacts',
  basePayloadUrl: 'http://localhost:3000',
  web3storageToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA2MEZkRjhjODA0MDI3NDZkNTlmQmRhNDhFNEY3QzFkNDU0RTJFMTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDgyOTEwNDYzMzIsIm5hbWUiOiJ0ZXN0In0.s4dWeJO3aZhn_xT5SpTgyPOUkiiewwy1CeP_pAX11lM',
  env: OutpostCurrentState.LOCAL,
};

interface RoverOptions {
  contractsPath: string;
  artifactsPath?: string;
  basePayloadUrl: string;
  web3storageToken?: string;
  env: OutpostCurrentState;
}

async function main() {
  program
    .version(packgeJSON.version)
    // .command('run')
    .action(run);

  await program.parseAsync(process.argv);
}

const run = async () => {
  showBanner('Generating UI state for contracts');

  const data = await getContracts(
    defaultOptions.contractsPath,
    defaultOptions.web3storageToken,
    defaultOptions.artifactsPath,
    showBanner,
  );

  const globalState: OutpostGlobal = generateGlobalState(
    defaultOptions.env,
    data,
    showBanner,
  );

  const uploadedUrl: string = await uploadAndGenerateUrl(
    globalState,
    defaultOptions.web3storageToken,
    defaultOptions.basePayloadUrl,
  );
  showBanner(`${uploadedUrl}`);
  fs.writeFileSync('test.json', JSON.stringify(globalState, null, 2));
  showBanner('DONE!');
};

// TODO refactor id generation (guid?)
async function getContracts(
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
    contracts.map(async x => {
      log(`processing ${x} contract`);
      const schemasPath = path.join(contractsPath, x, 'schema');
      const contractId = GetId() + contractIdPart;
      contractIdPart++;
      const messageSchemas = fs.readdirSync(schemasPath);
      const messages: ContractMessage[] = getOkMessages(messageSchemas)
        .map(m => {
          const filePath = path.join(schemasPath, m);
          console.log({ filePath });
          const data = JSON.parse(
            fs.readFileSync(filePath, { encoding: 'utf8' }),
          );
          let result;
          if (data.anyOf) {
            const anyOfMessages = data.anyOf;
            result = anyOfMessages.map(aom => {
              messageIdPart++;
              log(`processing ${aom.required[0]} message of ${x} contract`);
              return {
                id: GetId() + messageIdPart,
                contractId: contractId,
                collapsed: true,
                type: getMessageType(m),
                message: JSON.stringify(jsf.generate(aom), null, 2),
                title: aom.required[0],
              };
            });
          } else {
            log(`processing ${data.required[0]} message of ${x} contract`);
            result = {
              id: GetId() + messageIdPart,
              contractId: contractId,
              collapsed: true,
              type: getMessageType(m),
              message: JSON.stringify(jsf.generate(data), null, 2),
              title: data.required[0],
            };
          }
          messageIdPart++;
          return result;
        })
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
    }),
  );
  return result;
}

function getOkMessages(messages: string[]) {
  return messages.filter(
    m =>
      m.indexOf('instantiate') !== -1 ||
      m.indexOf('query') !== -1 ||
      m.indexOf('execute') !== -1,
  );
}

function getMessageType(m: string): ContractMessageTypes {
  if (m.indexOf('instantiate') !== -1) return ContractMessageTypes.INSTA;
  else if (m.indexOf('query') !== -1) return ContractMessageTypes.QUERY;
  else if (m.indexOf('execute') !== -1) return ContractMessageTypes.EXECUTE;
}

function generateGlobalState(
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

main();
async function uploadAndGenerateUrl(
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

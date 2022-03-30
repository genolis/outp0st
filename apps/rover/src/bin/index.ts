#!/usr/bin/env node
import {
  Contract,
  ContractMessage,
  ContractMessageTypes,
  GetId,
  getTabTitle,
  OutpostCurrentState,
} from '@outpost/core';
import { Command } from 'commander';
import fs from 'fs';
import jsf from 'json-schema-faker';
import path from 'path';
import * as packgeJSON from '../../package.json';
import { showBanner } from '../banner';

const program = new Command();

const defaultOptions: RoverOptions = {
  contractsPath: './contracts',
  artifactsPath: '',
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

program
  .version(packgeJSON.version)
  // .arguments('<food> <drink>')
  // .option(
  //     '-w --write <string>',
  //     'Specifies the path of the file the order will be written to'
  // )
  .action(function () {
    showBanner('Generating UI state for contracts');

    // setTimeout(() => showBanner('Done!'), 2000);

    const data = getContracts(
      defaultOptions.contractsPath,
      defaultOptions.web3storageToken,
    );

    //data.map(x => console.log({c: x.contract.title}))

    // const messages:ContractMessage[] = getMessagesForContracts(
    //   defaultOptions.contractsPath,
    //   contracts,
    // );
    // const globalState: OutpostGlobal = generateGlobalState('test', contracts, messages);

    // const uploadedUrl: string = uploadAndGenerateUrl(globalState, defaultOptions.web3storageToken, defaultOptions.basePayloadUrl)

    fs.writeFileSync('test.json', JSON.stringify(data, null, 2));
    showBanner('DONE!');
  })
  .parse(process.argv);

function getContracts(contractsPath: string, web3storageToken: string) {
  jsf.option({ requiredOnly: true });
  const contracts = fs.readdirSync(contractsPath);

  const result = contracts.map(x => {
    const schemasPath = path.join(contractsPath, x, 'schema');
    const contractId = GetId();
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
            return {
              id: GetId(),
              contractId: contractId,
              collapsed: true,
              type: getMessageType(m),
              message: JSON.stringify(jsf.generate(aom), null, 2),
              title: aom.required[0],
            };
          });
        } else {
          result = {
            id: GetId(),
            contractId: contractId,
            collapsed: true,
            type: getMessageType(m),
            message: JSON.stringify(jsf.generate(data), null, 2),
            title: data.required[0],
          };
        }

        return result;
      })
      .flat();
    const contract: Contract = {
      id: contractId,
      title: x,
      tabTitle: getTabTitle(x),
      messages: messages.map(mx => mx.id),
    };
    return { contract, messages };
  });

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

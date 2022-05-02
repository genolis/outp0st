import { ContractMessageTypes, OutpostGlobal } from '@outp0st/core';
export declare function getOkMessages(messages: string[]): string[];
export declare function getMessageType(m: string): ContractMessageTypes;
export declare function uploadAndGenerateUrl(globalState: OutpostGlobal, web3storageToken: string, basePayloadUrl: string): Promise<string>;
export declare function tryReadJson(path: string): any;

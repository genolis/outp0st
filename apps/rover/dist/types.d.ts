import { OutpostCurrentState } from '@outp0st/core';
export interface RoverOptions {
    contractsPath: string;
    artifactsPath?: string;
    basePayloadUrl: string;
    web3storageToken?: string;
    env: OutpostCurrentState;
    workspace: boolean;
    cid?: any;
    wasm_prefix?: string;
}

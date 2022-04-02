import { OutpostCurrentState } from '@outp0st/core';

export interface RoverOptions {
  contractsPath: string;
  artifactsPath?: string;
  basePayloadUrl: string;
  web3storageToken?: string;
  env: OutpostCurrentState;
  workspace: boolean;
  // last uploaded cid, TODO: make array of ['uploaded artifacts hash': cid] and automatically check wether we need to upload more
  cid?: any;
  wasm_prefix?: string;
}

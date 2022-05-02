import { Contract, ContractMessage, OutpostCurrentState, OutpostGlobal } from '@outp0st/core';
export declare function generateGlobalState(env: OutpostCurrentState, data: {
    contract: Contract;
    messages: ContractMessage[];
}[], showBanner: (msg: any) => void): OutpostGlobal;

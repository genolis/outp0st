import { Contract, ContractMessage } from '@outp0st/core';
import { RoverOptions } from './types';
export declare function getContracts(options: RoverOptions): Promise<{
    contract: Contract;
    messages: ContractMessage[];
}[]>;
export declare function processContractsFolders(contractTitle: string, contractIdPart: number, messageIdPart: number, options: RoverOptions): Promise<{
    contract: Contract;
    messages: ContractMessage[];
}>;

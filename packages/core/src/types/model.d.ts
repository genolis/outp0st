export interface CoinInput {
    input?: number;
    denom: CoinDenom;
}

type CoinDenom = string; // uluna | uusd

export interface Contract {
    id: number;
    binString?: string;
    binUrl?: string;
    codeId?: number;
    contractAddress?: string;
    additionalContractAddress?: string;
    title: string;
    description?: string;
    tabTitle: string;
    messages: number[];
    collapsed?: boolean;
}

export interface ContractMessage {
    id: number;
    isMulti?: boolean;
    multiType?: ContractExecuteMultiMessageTypes;
    message?: string;
    title?: string;
    type: ContractMessageTypes;
    description?: string;
    collapsed: boolean;
    contractId: number;
    coins?: CoinInput[];
    renderMode?: ContractMessageRenderModes;
    schema?: string;
    params?: number[];
}

export interface OutpostParam {
    id: number;
    title: string;
    type: OutpostParamsTypes;
    value: string | number;
}

export enum OutpostParamsTypes {
    STRING = 'STRING',
    NUM = 'NUM',
    JSON = 'JSON',
}

export enum ContractExecuteMultiMessageTypes {
    SIMPLE = 'SIMPLE',
    LUV = 'LUV',
}

export enum ContractMessageTypes {
    INSTA = 'INSTA',
    EXECUTE = 'EXECUTE',
    EXECUTE_MULTI = 'EXECUTE_MULTI',
    QUERY = 'QUERY',
    DOC = 'DOC',
}

export enum ContractMessageRenderModes {
    JSON = 'JSON',
    FORM = 'FORM',
    SCHEMA = 'SCHEMA',
}

export interface Outpost {
    title?: string;
    version?: string;
    params?: OutpostParam[];
    contracts: Contract[];
    messages: ContractMessage[];
    isReadonly?: boolean;
}

export interface OutpostSettings {
    stateLoadSwitcher: boolean;
}

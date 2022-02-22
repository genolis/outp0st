import { Outpost } from 'types/model';
import { storeWasm, storeWasmOpts } from './outpostCommands/storeWasm';
import { storeCode } from './terraCommands/storeCode';

export interface DeployOpts {
    title?: string;
    mnemonic: string;
    URL?: string;
    chainID?: string;
    gasAdjustment?: number;
}

export interface DeployParams {
    shouldStoreWasm?: boolean;
    shouldInstantiateContracts?: boolean;
    shouldExecuteMessages?: boolean;
}

export const deployOutpostState = async (
    state: Outpost,
    {
        title = 'Unidentified deployment',
        mnemonic,
        URL = 'https://bombay-lcd.terra.dev',
        chainID = 'bombay-12',
        gasAdjustment = 1.3,
    }: DeployOpts,
    deployParams: DeployParams = {
        shouldStoreWasm: true,
        shouldExecuteMessages: true,
        shouldInstantiateContracts: true,
    }
) => {
    const deployOpts = { title, mnemonic, URL, chainID, gasAdjustment };
    let newState = { ...state };
    if (deployParams?.shouldStoreWasm) {
        newState = await storeWasm(state, deployOpts as storeWasmOpts);
    }
    return newState;
};

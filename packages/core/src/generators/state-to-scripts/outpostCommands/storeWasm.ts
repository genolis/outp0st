import { Outpost } from 'types/model';
import { DeployOpts } from '../deploy';
import { storeCode } from '../terraCommands/storeCode';

interface codeIdsResult {
    title: string;
    code_id: number;
    id: number;
}

export interface storeWasmOpts extends DeployOpts {
    title: string;
    mnemonic: string;
    URL: string;
    chainID: string;
    gasAdjustment: number;
}
export async function storeWasm(
    state: Outpost,
    { title, mnemonic, URL, chainID, gasAdjustment }: storeWasmOpts
) {
    const codeIdsPromises = state.contracts.map(async (contract) => {
        const codeId = await storeCode({
            title,
            mnemonic,
            URL,
            chainID,
            wasmPath: `.${contract.binUrl}`,
            gasAdjustment,
        });
        const result: codeIdsResult = {
            title: contract.title,
            code_id: codeId,
            id: contract.id,
        };
        return result;
    });

    const codeIds = await Promise.all(codeIdsPromises);
    const newState: Outpost = {
        ...state,
        contracts: state.contracts.map((x) => {
            const newCodeId = codeIds.find((id) => x.id === id.id);
            return { ...x, codeId: newCodeId?.code_id };
        }),
    };
    return newState;
}

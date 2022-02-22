import {
    LCDClient,
    MsgStoreCode,
    MnemonicKey,
    isTxError,
} from '@terra-money/terra.js';
import * as fs from 'fs';
import logger from 'utils/logger';
import { DeployOpts } from '../deploy';

export interface StoreCodeOpts extends DeployOpts {
    wasmPath: string;
    memo?: string;
}
export async function storeCode({
    title = 'Unidentified contract',
    mnemonic,
    URL = 'https://bombay-lcd.terra.dev',
    chainID = 'bombay-12',
    wasmPath,
    gasAdjustment = 1.3,
    memo = 'Terra outpost storeCode: ',
}: StoreCodeOpts): Promise<number> {
    logger.info(`storing code from path`, { service: 'storeCode', wasmPath });
    if (!mnemonic && !wasmPath)
        throw new Error(
            'storeCode: either mnemonic or wasmPath missing for ' + title
        );
    const mk = new MnemonicKey({
        mnemonic: mnemonic,
    });
    const terra = new LCDClient({
        URL: URL,
        chainID: chainID,
        gasAdjustment: gasAdjustment,
    });

    const wallet = terra.wallet(mk);

    const storeCode = new MsgStoreCode(
        wallet.key.accAddress,
        fs.readFileSync(wasmPath).toString('base64')
    );

    const storeCodeTx = await wallet.createAndSignTx({
        msgs: [storeCode],
        memo: memo + title,
    });

    const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);

    if (isTxError(storeCodeTxResult)) {
        throw new Error(
            `store code failed. code: ${storeCodeTxResult.code},
            codespace: ${storeCodeTxResult.codespace}, 
            raw_log: ${storeCodeTxResult.raw_log}`
        );
    }

    const {
        store_code: { code_id },
    } = storeCodeTxResult.logs[0].eventsByType;
    if (code_id?.length < 1)
        throw new Error(
            'storeCode: something wrong with log parsing, error getting code_id'
        );

    const result = parseInt(code_id[0].toString());
    // should not return array, cuz we store only 1 at a time
    logger.info(`storing code from path`, {
        service: 'storeCode',
        wasmPath,
        codeId: result,
    });
    return result;
}

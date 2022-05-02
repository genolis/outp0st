import { CIDString } from 'web3.storage/dist/src/lib/interface';
export declare function getStateTitle(title: string, version: string): string;
export declare function makeFileObjectsJson(filename: string, outpost: any): File[];
export declare function storeFiles(files: any, token: string): Promise<CIDString>;
export declare function getLink(title: string, cid: CIDString): string;
export interface Web3storageOptions {
    token: string;
    type: 'json' | 'wasm';
    filepath?: string;
    json?: any;
    title?: string;
}
export declare function web3Upload(params: Web3storageOptions): Promise<{
    cid: CIDString;
    link: string;
}>;

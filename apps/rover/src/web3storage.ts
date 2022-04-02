// https://web3.storage/docs/how-tos/store
import { File, getFilesFromPath, Web3Storage } from 'web3.storage';
import { CIDString } from 'web3.storage/dist/src/lib/interface';

export function getStateTitle(title: string, version: string) {
  return `outpost.${title.replace(/\s/g, '_')}.${
    version || '1.0.0'
  }.${Date.now()}.json`;
}

export function makeFileObjectsJson(
  filename: string = 'hello.json',
  outpost: any,
) {
  const obj = outpost;
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [new File([buffer], filename)];
  return files;
}

export async function storeFiles(files: any, token: string) {
  const client = new Web3Storage({
    token,
  });
  const cid = await client.put(files);
  console.log('stored files with cid:', cid);
  return cid;
}

export function getLink(title: string, cid: CIDString) {
  return `https://dweb.link/ipfs/${cid}/${title}`;
}

export interface Web3storageOptions {
  token: string;
  type: 'json' | 'wasm';
  filepath?: string;
  json?: any;
  title?: string;
}

export async function web3Upload(params: Web3storageOptions) {
  const { token, type, filepath, json, title } = params;
  const files =
    type === 'wasm'
      ? await getFilesFromPath(filepath || '')
      : makeFileObjectsJson(title, json);
  const cid = await storeFiles(files, token);
  return { cid, link: getLink(title || '', cid) };
}

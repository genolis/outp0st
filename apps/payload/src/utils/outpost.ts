// https://web3.storage/docs/how-tos/troubleshooting/#i-need-to-use-webpack-4
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

export function getStateTitle(title, version) {
  return `outpost.${title?.replaceAll(' ', '_')}.${
    version || '1.0.0'
  }.${Date.now()}.json`;
}

export function makeFileObjects(filename: string = 'hello.json', outpost) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = outpost;
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });

  const files = [new File([blob], filename)];
  return files;
}

export async function storeFiles(files, token) {
  const client = new Web3Storage({
    token,
  });
  const cid = await client.put(files);
  console.log('stored files with cid:', cid);
  return cid;
}

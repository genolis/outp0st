import { GetId } from '@outpost/core';
import fs from 'fs';
import path from 'path';
import { getMessageType } from './utils';

export function processMessageSchemas(
  m: string,
  x: string,
  schemasPath: string,
  messageIdPart: number,
  log: (string) => void,
  contractId: number,
  jsf: any,
) {
  const filePath = path.join(schemasPath, m);
  console.log({ filePath });
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  let result;
  if (data.anyOf) {
    const anyOfMessages = data.anyOf;
    result = anyOfMessages.map(aom => {
      messageIdPart++;
      log(`processing ${aom.required[0]} message of ${x} contract`);
      return {
        id: GetId() + messageIdPart,
        contractId: contractId,
        collapsed: true,
        type: getMessageType(m),
        message: JSON.stringify(jsf.generate(aom), null, 2),
        title: aom.required[0],
      };
    });
  } else {
    log(`processing ${data.required[0]} message of ${x} contract`);
    result = {
      id: GetId() + messageIdPart,
      contractId: contractId,
      collapsed: true,
      type: getMessageType(m),
      message: JSON.stringify(jsf.generate(data), null, 2),
      title: data.required[0],
    };
  }
  messageIdPart++;
  return result;
}

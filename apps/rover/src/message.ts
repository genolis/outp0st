import { ContractMessageRenderModes, GetId } from '@outpost/core';
import fs from 'fs';
import path from 'path';
import { jsf } from './jsf';
import { log } from './log';
import { getMessageType } from './utils';

export function processMessageSchemas(
  messageTitle: string,
  contractTitle: string,
  schemasPath: string,
  messageIdPart: number,
  contractId: number,
) {
  const filePath = path.join(schemasPath, messageTitle);
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  let result;
  if (data.anyOf || data.oneOf) {
    const anyOfMessages = data.anyOf || data.oneOf;
    const def = data.definitions;
    result = anyOfMessages.map(aom => {
      aom['definitions'] = def;
      return generateMessage(
        messageIdPart,
        contractTitle,
        aom.required[0],
        contractId,
        messageTitle,
        aom,
      );
    });
  } else {
    result = generateMessage(
      messageIdPart,
      contractTitle,
      getMessageSchemaTitle(data, messageTitle),
      contractId,
      messageTitle,
      data,
    );
  }
  messageIdPart++;
  return result;
}

function generateMessage(
  messageIdPart: number,
  contractTitle: string,
  messageSchemaTitle: string,
  contractId: number,
  messageTitle: string,
  messageSchema: any,
) {
  messageIdPart++;
  const t = getMessageType(messageTitle);
  log(
    `processing [${t}] ${messageSchemaTitle} message of ${contractTitle} contract`,
  );

  return {
    id: GetId() + messageIdPart,
    contractId: contractId,
    collapsed: true,
    type: t,
    message: JSON.stringify(jsf.generate(messageSchema), null, 2),
    title: `[${t}] ${messageSchemaTitle}`,
    renderMode: ContractMessageRenderModes.JSON,
  };
}
function getMessageSchemaTitle(data: any, messageTitle: string): string {
  let result = `${messageTitle} - unk`;
  if (data && data.title) result = data.title;
  if ((!data || !data.title) && data.required && data.required.length > 0)
    result = data.required[0];
  return result;
}

import { ContractMessage, ContractMessageTypes } from '@outp0st/core';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { FormItem, Input } from 'components/form';
import { Button } from 'components/general';
import { useExecuteMessageCustom } from 'outpost/hooks/useExecuteMessageCustom';
import { validateMsg } from 'outpost/utils';
import { useState } from 'react';
// import Tx from "txs/Tx"
import TxContext from 'txs/TxContext';
import Tx from '../../Tx';
import Fetching from '../elements/Fetching';
import OutpostCardMessageRenderer from '../layout/message/OutpostCardMessageRenderer';
// import validate from 'txs/validate';

interface OutpostMessageExecuteMultiProps {
  message: ContractMessage;
}

interface CW20TransferMsg {
  transfer: {
    amount: string;
    recipient: string;
  };
}

export default function OutpostMessageExecuteMulti({
  message,
}: OutpostMessageExecuteMultiProps) {
  const [memo, setMemo] = useState("");
  const { tx } = useExecuteMessageCustom(
    message,
    (address, contractAddress, exec_msg, coins) => {
      //console.log({ exec_msg });
      let result_msgs: any[] = [];
      // if (
      //   message.type === ContractMessageTypes.EXECUTE_MULTI &&
      //   message.multiType === ContractExecuteMultiMessageTypes.TRANSFER_LUV
      // ) {
      //   const msgs: Array<{ address: string; amount: string }> = exec_msg;
      //   result = msgs.map(msg => {
      //     const transferMsg: CW20TransferMsg = {
      //       transfer: {
      //         amount: msg.amount,
      //         recipient: msg.address,
      //       },
      //     };
      //     return new MsgExecuteContract(
      //       address,
      //       contractAddress,
      //       transferMsg,
      //       coins,
      //     );
      //   });
      //} 
      if (
        message.type === ContractMessageTypes.EXECUTE_MULTI 
        // && message.multiType === ContractExecuteMultiMessageTypes.SIMPLE
      ) {
        const msgs: CW20TransferMsg[] = exec_msg;
        if (Array.isArray(msgs))
        result_msgs = msgs.map(msg => {
            return new MsgExecuteContract(address, contractAddress, msg, coins);
          });
      }
      //console.log({ result });
      return {memo, msgs:result_msgs};
    },
  );
  const placeholderString = `
  [
    {
      "transfer": {
        "amount": "2000000",
        "recipient": "terra1ejksjvfvzpcqzg88nfd82hx2cv7g7lj9gjz669"
      }
    },
    {
      "transfer": {
        "amount": "2000000",
        "recipient": "terra1ejksjvfvzpcqzg88nfd82hx2cv7g7lj9gjz669"
      }
    }
  ]
  `
  const validateError = validateMsg(message.message || '');
  const finalTx = {...tx, memo}
  return (
    <TxContext>
      <Tx { ...finalTx }>
        {({ fee, submit, failMessage, resultQuery, disabled }) => (
          <Fetching {...resultQuery}>
            <FormItem label="Memo">
            <Input
                placeholder="Can be empty"
                value={memo}
                onChange={e =>
                  setMemo(e.target.value)
                }
              />
              </FormItem>
            <OutpostCardMessageRenderer
              message={message}
              failMessage={failMessage}
              validateError={validateError}
              placeholder={placeholderString}
            />

            {fee.render()}
            <Button
              style={{ marginTop: '20px' }}
              onClick={() => submit.fn({})}
              disabled={!!(validateError || !!disabled)}
              color="primary"
            >
              Execute message
            </Button>
          </Fetching>
        )}
      </Tx>
    </TxContext>
  );
}

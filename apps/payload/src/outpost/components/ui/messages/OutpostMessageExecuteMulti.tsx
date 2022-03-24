import {
  ContractExecuteMultiMessageTypes,
  ContractMessage,
  ContractMessageTypes,
} from '@outpost/core';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { Button } from 'components/general';
import { useExecuteMessageCustom } from 'outpost/hooks/useExecuteMessageCustom';
import { validateMsg } from 'outpost/utils';
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
  const { tx } = useExecuteMessageCustom(
    message,
    (address, contractAddress, exec_msg, coins) => {
      //console.log({ exec_msg });
      let result: any[] = [];
      if (
        message.type === ContractMessageTypes.EXECUTE_MULTI &&
        message.multiType === ContractExecuteMultiMessageTypes.TRANSFER_LUV
      ) {
        const msgs: Array<{ address: string; amount: string }> = exec_msg;
        result = msgs.map(msg => {
          const transferMsg: CW20TransferMsg = {
            transfer: {
              amount: msg.amount,
              recipient: msg.address,
            },
          };
          return new MsgExecuteContract(
            address,
            contractAddress,
            transferMsg,
            coins,
          );
        });
      } else if (
        message.type === ContractMessageTypes.EXECUTE_MULTI &&
        message.multiType === ContractExecuteMultiMessageTypes.SIMPLE
      ) {
        const msgs: CW20TransferMsg[] = exec_msg;
        result = msgs.map(msg => {
          return new MsgExecuteContract(address, contractAddress, msg, coins);
        });
      }
      //console.log({ result });
      return result;
    },
  );
  const validateError = validateMsg(message.message || '');
  return (
    <TxContext>
      <Tx {...tx}>
        {({ fee, submit, failMessage, resultQuery, disabled }) => (
          <Fetching {...resultQuery}>
            <OutpostCardMessageRenderer
              message={message}
              failMessage={failMessage}
              validateError={validateError}
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

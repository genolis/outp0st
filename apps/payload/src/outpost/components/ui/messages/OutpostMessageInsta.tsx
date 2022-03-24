import { ContractMessage } from '@outpost/core';
import { FormItem, Input } from 'components/form';
import { Button } from 'components/general';
import Tx from 'outpost/components/Tx';
import { useInstaMessageStation } from 'outpost/hooks/useInstaMessageStation';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { validateMsg } from 'outpost/utils';
import TxContext from 'txs/TxContext';
import Fetching from '../elements/Fetching';
import OutpostCardMessageRenderer from '../layout/message/OutpostCardMessageRenderer';
// import { Fetching } from 'components/feedback';
// import Tx from 'txs/Tx';

interface OutpostMessageInstaProps {
  message: ContractMessage;
}

export default function OutpostMessageInsta({
  message,
}: OutpostMessageInstaProps) {
  const { tx, contract } = useInstaMessageStation(message);
  const validateError = validateMsg(message.message || '');
  const { updateContract } = useOutpostState();

  return (
    <TxContext>
      <Tx {...tx}>
        {({ fee, submit, failMessage, resultQuery, disabled }) => (
          <Fetching {...resultQuery}>
            <FormItem label="admin">
              <Input
                placeholder="Can be empty, admin will be sender"
                value={contract.admin}
                onChange={e =>
                  updateContract({
                    ...contract,
                    admin: e.target.value,
                  })
                }
              />
            </FormItem>
            <div>
              <OutpostCardMessageRenderer
                message={message}
                failMessage={failMessage}
                validateError={validateError}
              />

              {fee.render()}
              <Button
                style={{ marginTop: '20px' }}
                onClick={() => submit.fn({})}
                color="primary"
                disabled={!!(validateError || !!disabled)}
              >
                Instantiate Contract
              </Button>
            </div>
          </Fetching>
        )}
      </Tx>
    </TxContext>
  );
}

import { useInstaMessageStation } from 'outpost/hooks/useInstaMessageStation';
import { ContractMessage } from 'outpost/state/model';
import TxContext from 'txs/TxContext';
import { Button } from 'components/general';
import OutpostCardMessageRenderer from '../layout/message/OutpostCardMessageRenderer';
import { validateMsg } from 'outpost/utils';
import Tx from 'outpost/components/Tx';
import Fetching from '../elements/Fetching';
import { FormItem, Input } from 'components/form';
import { useOutpostState } from 'outpost/state/useOutpostState';
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
                        <FormItem label='admin'>
                            <Input
                                placeholder='Can be empty, admin will be sender'
                                value={contract.admin}
                                onChange={(e) =>
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
                                color='primary'
                                disabled={!!(validateError || !!disabled)}>
                                Instantiate Contract
                            </Button>
                        </div>
                    </Fetching>
                )}
            </Tx>
        </TxContext>
    );
}

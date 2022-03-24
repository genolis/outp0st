import { Button } from 'components/general';

import { useExecuteMessage } from 'outpost/hooks/useExecuteMessage';
import { ContractMessage } from 'outpost/state/model';
import { validateMsg } from 'outpost/utils';
// import Tx from "txs/Tx"
import TxContext from 'txs/TxContext';
import Tx from '../../Tx';
import Fetching from '../elements/Fetching';
import OutpostMessageExecuteAmount from '../elements/OutpostMessageExecuteAmount';
import OutpostCardMessageRenderer from '../layout/message/OutpostCardMessageRenderer';
// import validate from 'txs/validate';

interface OutpostMessageExecuteProps {
    message: ContractMessage;
}

export default function OutpostMessageExecute({
    message,
}: OutpostMessageExecuteProps) {
    const { tx } = useExecuteMessage(message);
    const validateError = validateMsg(message.message || '');
    return (
        <TxContext>
            <Tx {...tx}>
                {({ fee, submit, failMessage, resultQuery, disabled }) => (
                    <Fetching {...resultQuery}>
                        <div>
                            <OutpostCardMessageRenderer
                                message={message}
                                failMessage={failMessage}
                                validateError={validateError}
                            />

                            <OutpostMessageExecuteAmount
                                message={message}
                                initialGasDenom={tx.initialGasDenom}
                            />
                            <div style={{ marginBottom: '20px' }}></div>
                            {fee.render()}
                            <Button
                                style={{ marginTop: '20px' }}
                                disabled={!!(validateError || !!disabled)}
                                onClick={() => submit.fn({})}
                                color='primary'>
                                Execute message
                            </Button>
                        </div>
                    </Fetching>
                )}
            </Tx>
        </TxContext>
    );
}

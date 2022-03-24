import { FC, Suspense } from 'react';

import { useOutpostState } from 'outpost/state/useOutpostState';

import { ContractMessage, ContractMessageTypes } from 'outpost/state/model';

import OutpostCardMessageHeader from './OutpostCardMessageHeader';
import OutpostCardMessageBody from './OutpostCardMessageBody';
import React from 'react';
const OutpostMessageQuery = React.lazy(
    () => import('../../messages/OutpostMessageQuery')
);
const OutpostMessageExecute = React.lazy(
    () => import('../../messages/OutpostMessageExecute')
);
const OutpostMessageExecuteMulti = React.lazy(
    () => import('../../messages/OutpostMessageExecuteMulti')
);
const OutpostMessageInsta = React.lazy(
    () => import('../../messages/OutpostMessageInsta')
);
const OutpostMessageDoc = React.lazy(
    () => import('../../messages/OutpostMessageDoc')
);

export interface MessageCardProps {
    contractId: number;
    messageId: number;
}

const OutpostMessageCardConstructor: FC<MessageCardProps> = ({ messageId }) => {
    const { getMessage } = useOutpostState();
    const message: ContractMessage = getMessage(messageId) as ContractMessage;
    return (
        <div style={{ marginTop: '20px' }}>
            <OutpostCardMessageHeader message={message}>
                <OutpostCardMessageBody message={message}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {GetMessageByType(message)}
                    </Suspense>
                </OutpostCardMessageBody>
            </OutpostCardMessageHeader>
        </div>
    );
};

function GetMessageByType(message: ContractMessage) {
    //console.log({ type: message.type });
    switch (message.type) {
        case ContractMessageTypes.INSTA:
            return <OutpostMessageInsta message={message} />;
        case ContractMessageTypes.QUERY:
            return <OutpostMessageQuery message={message} />;
        case ContractMessageTypes.EXECUTE:
            return <OutpostMessageExecute message={message} />;
        case ContractMessageTypes.EXECUTE_MULTI:
            return <OutpostMessageExecuteMulti message={message} />;
        case ContractMessageTypes.DOC:
            return <OutpostMessageDoc message={message} />;
        default:
            return <div>something went wrong... :(</div>;
    }
}

export default OutpostMessageCardConstructor;

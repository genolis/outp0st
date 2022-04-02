import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';
import { ContractMessage } from '@outp0st/core';
import { Button as Btn } from 'components/general';
import { Card } from 'components/layout';
import { useRO } from 'outpost/hooks/useRO';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { FC } from 'react';
import { EasyMessage } from '../../elements/EasyMessage';
import { MessageAnchor } from '../../elements/MessageAnchor';
import styles from '../OutpostCardContractBody.module.scss';

interface OutpostCardMessageHeaderProps {
  message: ContractMessage;
}

const OutpostCardMessageHeader: FC<OutpostCardMessageHeaderProps> = ({
  message,
  children,
}) => {
  const {
    removeMessage,
    updateMessage,
    moveMessage,
    canMessageMove,
    getContract,
  } = useOutpostState();
  const contract = getContract(message.contractId);
  const ro = useRO();
  return (
    <div>
      <Card
        title={
          <MessageAnchor mId={message.id} tabTitle={contract?.tabTitle}>
            <EasyMessage message={message} messageProp={'title'} />
          </MessageAnchor>
        }
        extra={
          <div>
            {!ro && canMessageMove('up', message) && (
              <Button
                onClick={() => {
                  moveMessage('up', message);
                }}
                size="small"
              >
                <ArrowUpwardIcon />
              </Button>
            )}
            {!ro && canMessageMove('down', message) && (
              <Button
                onClick={() => {
                  moveMessage('down', message);
                }}
                size="small"
              >
                <ArrowDownwardIcon />
              </Button>
            )}
            <Btn
              onClick={() => {
                updateMessage({
                  ...message,
                  collapsed: !message.collapsed,
                });
              }}
              size="small"
            >
              {message.collapsed ? 'show' : 'hide'}
            </Btn>
            {!ro && (
              <Btn
                size="small"
                color="danger"
                onClick={() => {
                  const ok = window.confirm(
                    'are you sure you want to remove this message?',
                  );
                  if (ok) {
                    removeMessage(message.id);
                  }
                }}
              >
                Remove
              </Btn>
            )}
          </div>
        }
        mainClassName={styles.main}
        bordered
      >
        {children}
      </Card>
    </div>
  );
};

export default OutpostCardMessageHeader;

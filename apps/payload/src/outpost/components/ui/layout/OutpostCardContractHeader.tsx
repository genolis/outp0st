import { Contract } from '@outp0st/core';
import { Button } from 'components/general';
import { Card } from 'components/layout';
import { useRO } from 'outpost/hooks/useRO';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { EasyContract } from '../elements/EasyContract';
import styles from './OutpostCardContractBody.module.scss';

interface OutpostCardContractHeaderProps {
  contract: Contract;
}

const OutpostCardContractHeader: FC<OutpostCardContractHeaderProps> = ({
  contract,
  children,
}) => {
  const { removeContract, updateContract } = useOutpostState();
  const navigate = useNavigate();
  const ro = useRO();
  return (
    <div>
      <Card
        title={
          <span>
            <EasyContract contract={contract} contractProp={'title'} />
          </span>
        }
        extra={
          <div>
            {contract.binUrl && (
              <Button
                onClick={() => {
                  updateContract({
                    ...contract,
                    collapsed: !contract.collapsed,
                  });
                }}
                size="small"
              >
                {contract.collapsed ? 'show' : 'hide'}
              </Button>
            )}
            {!ro && (
              <Button
                size="small"
                color="danger"
                onClick={() => {
                  const ok = window.confirm(
                    'are you sure you want to remove contract tab?',
                  );
                  if (ok) {
                    removeContract(contract.id);
                    navigate(-1);
                  }
                }}
              >
                Remove
              </Button>
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

export default OutpostCardContractHeader;

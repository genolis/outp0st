import { Button as Btn } from '@mui/material';
import { OutpostCurrentState } from '@outp0st/core';
import { FormItem } from 'components/form';
import { Button } from 'components/general';
import { Card } from 'components/layout';
import BtnGroup from 'outpost/components/ui/elements/BtnGroup';
import { useOutpostState } from 'outpost/state/useOutpostState';
import styles from 'pages/gov/ProposalsByStatus.module.scss';
import { useState } from 'react';

export const Environment = () => {
  const { outpostGlobal, updateGlobalState } = useOutpostState();
  const [to, setTo] = useState<OutpostCurrentState>(OutpostCurrentState.LOCAL);
  return (
    <Card title="Environments manipulations" className={styles.link}>
      <div style={{ marginTop: '20px' }}>
        <FormItem
          label={`Copy all contracts and messages from ${outpostGlobal.current} to:`}
        >
          <BtnGroup>
            {outpostGlobal.current !== OutpostCurrentState.LOCAL && (
              <Btn
                variant={
                  to === OutpostCurrentState.LOCAL ? 'contained' : 'outlined'
                }
                onClick={() => setTo(OutpostCurrentState.LOCAL)}
              >
                Local
              </Btn>
            )}
            {outpostGlobal.current !== OutpostCurrentState.TEST && (
              <Btn
                variant={
                  to === OutpostCurrentState.TEST ? 'contained' : 'outlined'
                }
                onClick={() => setTo(OutpostCurrentState.TEST)}
              >
                Test
              </Btn>
            )}
            {outpostGlobal.current !== OutpostCurrentState.MAIN && (
              <Btn
                variant={
                  to === OutpostCurrentState.MAIN ? 'contained' : 'outlined'
                }
                onClick={() => setTo(OutpostCurrentState.MAIN)}
              >
                Main
              </Btn>
            )}
          </BtnGroup>
        </FormItem>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button
          onClick={() => {
            const ok = window.confirm(
              `Are you sure, you want to delete all ${to} environment contracts and messages and copy contracts and messages of ${outpostGlobal.current} to it?`,
            );
            if (ok) {
              updateGlobalState({
                ...outpostGlobal,
                ...{ [to]: { ...outpostGlobal[outpostGlobal.current] } },
              });
              //window.location.reload();
            }
          }}
        >
          Copy
        </Button>
      </div>
    </Card>
  );
};

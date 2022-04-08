import { Button } from '@mui/material';
import { OutpostCurrentState } from '@outp0st/core';
import { ExtraActions, Page } from 'components/layout';
import { OutpostTabs } from './components/OutpostTabs';
import BtnGroup from './components/ui/elements/BtnGroup';
import Tabs from './components/ui/elements/Tabs';
import { useStartup } from './hooks/useStartup';
import { useOutpostState } from './state/useOutpostState';

const Lunaverse = () => {
  useStartup();
  const { outpostGlobal, outpost, switchCurrentState } = useOutpostState();

  return (
    <Page
      title={outpost.title ? outpost.title : 'Outpost admin'}
      extra={
        <ExtraActions>
          <BtnGroup>
            {[
              { t: 'Mainnet', n: OutpostCurrentState.MAIN },
              { t: 'Testnet', n: OutpostCurrentState.TEST },
              { t: 'Localterra', n: OutpostCurrentState.LOCAL },
            ].map(({ t, n }) => (
              <Button
                variant={outpostGlobal.current === n ? 'contained' : 'outlined'}
                onClick={() => switchCurrentState(n)}
                size="small"
              >
                {t}
              </Button>
            ))}
          </BtnGroup>
        </ExtraActions>
      }
    >
      <Tabs tabs={OutpostTabs()} type="card" />
    </Page>
  );
};

export default Lunaverse;

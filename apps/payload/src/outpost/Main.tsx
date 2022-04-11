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
              { title: 'Mainnet', net: OutpostCurrentState.MAIN },
              { title: 'Testnet', net: OutpostCurrentState.TEST },
              { title: 'Localterra', net: OutpostCurrentState.LOCAL },
            ].map(({ title, net }) => (
              <Button
                key={title}
                variant={outpostGlobal.current === net ? 'contained' : 'outlined'}
                onClick={() => switchCurrentState(net)}
                size="small"
              >
                {title}
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

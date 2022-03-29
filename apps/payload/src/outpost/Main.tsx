import { Button } from '@mui/material';
import { OutpostCurrentState } from '@outpost/core';
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
            <Button
              variant={
                outpostGlobal.current === OutpostCurrentState.MAIN
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => switchCurrentState(OutpostCurrentState.MAIN)}
              size="small"
            >
              Mainnet
            </Button>

            <Button
              variant={
                outpostGlobal.current === OutpostCurrentState.TEST
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => switchCurrentState(OutpostCurrentState.TEST)}
              size="small"
            >
              Testnet
            </Button>

            <Button
              variant={
                outpostGlobal.current === OutpostCurrentState.LOCAL
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => switchCurrentState(OutpostCurrentState.LOCAL)}
              size="small"
            >
              Localterra
            </Button>
          </BtnGroup>
        </ExtraActions>
      }
    >
      <Tabs tabs={OutpostTabs()} type="card" />
    </Page>
  );
};

export default Lunaverse;

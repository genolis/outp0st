import { Button, Skeleton } from '@mui/material';
import { OutpostCurrentState } from '@outp0st/core';
import classNames from "classnames/bind";
import { ExtraActions, Page } from 'components/layout';
import { OutpostTabs } from './components/OutpostTabs';
import BtnGroup from './components/ui/elements/BtnGroup';
import Tabs from './components/ui/elements/Tabs';
import { useStartup } from './hooks/useStartup';
import styles from './Main.module.scss';
import { useOutpostSettings } from './state/useOutpostSettings';
import { useOutpostState } from './state/useOutpostState';

const Loading = (props) => {
  const { hide, show } = styles;

  return (<>
    {props.loading && <Page>
      <Skeleton animation="wave" variant="rectangular" height={55}></Skeleton>
      <Skeleton animation="wave" height={100}></Skeleton>
      <Skeleton animation="wave" variant="rectangular" height={900}></Skeleton>
    </Page >}
    <div className={classNames(props.loading && hide, show)}>
      {props.children}
    </div>
  </>)
}


const Lunaverse = () => {
  const { outpostGlobal, outpost, switchCurrentState } = useOutpostState();
  const { loading } = useOutpostSettings();

  useStartup();

  return <Loading loading={loading}>
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
      }>
      <Tabs tabs={OutpostTabs()} type="card" />
    </Page>
  </Loading>
};

export default Lunaverse;

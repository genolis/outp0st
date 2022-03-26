import { Page } from 'components/layout';
import { OutpostTabs } from './components/OutpostTabs';
import Tabs from './components/ui/elements/Tabs';
import { useStartup } from './hooks/useStartup';
import { useOutpostState } from './state/useOutpostState';

const Lunaverse = () => {
  useStartup();
  const { outpostApp } = useOutpostState();
  const title = outpostApp('get', 'title');

  return (
    <Page title={title ? title : 'Outpost admin'}>
      <Tabs tabs={OutpostTabs()} type="card" />
    </Page>
  );
};

export default Lunaverse;

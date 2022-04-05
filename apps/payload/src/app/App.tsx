import { ErrorBoundary, Wrong } from 'components/feedback';
import Layout, {
  Banner,
  Content,
  Header,
  Page,
  Sidebar,
} from 'components/layout';
import { getErrorMessage } from 'utils/error';
/* init */
import InitBankBalance from './InitBankBalance';
/* routes */
import { useNav } from './routes';
import Aside from './sections/Aside';
import ConnectWallet from './sections/ConnectWallet';
import DevTools from './sections/DevTools';
/* extra */
import LatestTx from './sections/LatestTx';
/* sidebar */
import Nav from './sections/Nav';
/* banner */
import NetworkName from './sections/NetworkName';
import Preferences from './sections/Preferences';
/* header */
import Refresh from './sections/Refresh';
import SelectTheme from './sections/SelectTheme';
import ValidatorButton from './sections/ValidatorButton';

const App = () => {
  const { element: routes } = useNav();

  return (
    <Layout>
      <Banner>
        <NetworkName />
      </Banner>

      <Sidebar>
        <Nav />
        <Aside />
      </Sidebar>

      <Header>
        <DevTools />
        <section>
          <Refresh />
          <Preferences />
          <SelectTheme />
        </section>
        <ValidatorButton />
        <ConnectWallet />
        <LatestTx />
      </Header>

      <Content>
        <ErrorBoundary fallback={fallback}>
          <InitBankBalance>{routes}</InitBankBalance>
        </ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default App;

/* error */
export const fallback = (error: Error) => (
  <Page>
    <Wrong>{getErrorMessage(error)}</Wrong>
  </Page>
);

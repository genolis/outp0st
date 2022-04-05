import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import App from 'app/App';
import ElectronVersion from 'app/ElectronVersion';
import InitNetworks from 'app/InitNetworks';
import InitTheme from 'app/InitTheme';
import InitWallet from 'app/InitWallet';
import ScrollToTop from 'app/ScrollToTop';
import { BRIDGE } from 'config/constants';
import 'config/lang';
import 'index.scss';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import 'tippy.js/dist/tippy.css';
import { debug } from 'utils/env';

const connectorOpts = { bridge: BRIDGE };

getChainOptions().then(chainOptions =>
  render(
    <StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <ScrollToTop />
          <WalletProvider {...chainOptions} connectorOpts={connectorOpts}>
            <InitNetworks>
              <InitWallet>
                <InitTheme />
                <ElectronVersion />
                <App />
              </InitWallet>
            </InitNetworks>
          </WalletProvider>
          {debug.query && <ReactQueryDevtools position="bottom-right" />}
        </BrowserRouter>
      </RecoilRoot>
    </StrictMode>,
    document.getElementById('station'),
  ),
);

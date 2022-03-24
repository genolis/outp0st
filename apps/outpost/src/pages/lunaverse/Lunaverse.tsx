import axios from 'axios';
import { Page } from 'components/layout';
import { useAddress } from 'data/wallet';
import { useEffect } from 'react';
import { OutpostTabs } from './components/OutpostTabs';
import Tabs from './components/ui/elements/Tabs';
import { useStartup } from './hooks/useStartup';
import { useOutpostState } from './state/useOutpostState';
import { useNavigate } from 'react-router-dom';

const Lunaverse = () => {
    const { outpostApp } = useOutpostState();
    const address = useAddress();
    const title = outpostApp('get', 'title');
    let navigate = useNavigate();
    useStartup();
    useEffect(() => {
        async function getOk() {
            const ok = true;
            //   await axios.get(
            //     'https://terra-outpost-auth-temp.vercel.app/api/auth?address=' + address
            //   );
            //   console.log(ok.data);
            //   if (!ok.data) navigate('/lunaverse/403', { replace: true });
        }
        getOk();
    }, [address, navigate]);

    return (
        <Page title={title ? title : 'Outpost admin'}>
            <Tabs tabs={OutpostTabs()} type='card' />
        </Page>
    );
};

export default Lunaverse;

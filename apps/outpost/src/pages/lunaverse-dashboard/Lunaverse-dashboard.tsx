import axios from 'axios';
import { LoadingCircular } from 'components/feedback';
import { Card, Col, Grid, Page, Row, Table } from 'components/layout';
import { Read } from 'components/token';
import { useAddress } from 'data/wallet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LunaverseDashboard = () => {
    const address = useAddress();
    let navigate = useNavigate();
    const [addresses, setAddresses] = useState<{
        circulating: number;
        sum: number;
        total: number;
        details: { addr: string; balance: string; description: string }[];
    }>({ circulating: 0, sum: 0, total: 0, details: [] });

    useEffect(() => {
        async function getOk() {
            const ok = await axios.get(
                'https://terra-outpost-auth-temp.vercel.app/api/auth?address=' +
                    address
            );
            console.log(ok.data);
            if (!ok.data) navigate('/lunaverse/403', { replace: true });
        }
        getOk();
    }, [address, navigate]);

    useEffect(() => {
        async function getWallets() {
            const ok = await axios.get(
                window.location.href.indexOf('localhost') === -1
                    ? 'https://source.lunaverse.io/circulation?detailed=true'
                    : 'http://localhost:5054/circulation?detailed=true'
            );
            console.log(ok.data);
            if (ok.data) {
                setAddresses(ok.data);
            }
        }
        getWallets();
    }, []);

    return (
        <Page title={'Dashboard'}>
            {!addresses.details.length ? (
                <LoadingCircular size={18} />
            ) : (
                <section>
                    <Grid gap={16}>
                        <Card title='Total' size='small' bordered>
                            <Row>
                                <Col>Circulating:</Col>
                                <Col>
                                    <Read amount={addresses.circulating} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Total in circulation:</Col>
                                <Col>
                                    <Read amount={addresses.total} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Sum on wallets balances:</Col>
                                <Col>
                                    <Read amount={addresses.sum} />
                                </Col>
                            </Row>
                        </Card>
                        <Card
                            title='Circulation addresses'
                            size='small'
                            bordered>
                            <Table
                                dataSource={addresses.details}
                                columns={[
                                    {
                                        title: 'Address',
                                        dataIndex: 'addr',
                                    },
                                    {
                                        title: 'Description',
                                        dataIndex: 'description',
                                    },
                                    {
                                        title: 'Balance',
                                        dataIndex: 'balance',
                                        render: (balance: string) => (
                                            <Read amount={balance.toString()} />
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </Grid>
                </section>
            )}
        </Page>
    );
};

export default LunaverseDashboard;

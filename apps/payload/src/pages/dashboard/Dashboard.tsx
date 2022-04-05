import { Col, Page } from 'components/layout';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Charts from './Charts';
import CommunityPool from './CommunityPool';
import styles from './Dashboard.module.scss';
import Issuance from './Issuance';
import LunaPrice from './LunaPrice';
import StakingRatio from './StakingRatio';

const Dashboard = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  useEffect(() => {
    navigate('/outpost');
  }, []);

  return (
    <Page title={t('Dashboard')}>
      <Col>
        <header className={styles.header}>
          <LunaPrice />
          <Issuance />
          <CommunityPool />
          <StakingRatio />
        </header>

        <Charts />
      </Col>
    </Page>
  );
};

export default Dashboard;

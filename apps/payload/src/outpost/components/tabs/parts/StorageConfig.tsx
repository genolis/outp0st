import { Button as Btn } from '@mui/material';
import { FormItem, Input } from 'components/form';
import { ExternalLink } from 'components/general';
import { Card } from 'components/layout';
import BtnGroup from 'outpost/components/ui/elements/BtnGroup';
import { useStateManager } from 'outpost/state/useStateManager';
import styles from 'pages/gov/ProposalsByStatus.module.scss';

export const StorageConfig = () => {
  // FULL REFACTOR here.
  const { manager, updateManager, updateStorageToken, getStorageConfigById } =
    useStateManager();

  return (
    <Card title="Storage options" className={styles.link}>
      <div style={{ marginTop: '20px' }}>
        <FormItem label="Variants">
          <BtnGroup>
            {manager.storageConfigs.map(c => (
              <Btn
                key={c.id}
                variant={
                  c.id === manager.currentConfigId ? 'contained' : 'outlined'
                }
                onClick={() =>
                  updateManager({ ...manager, currentConfigId: c.id || 0 })
                }
              >
                {c.type}
              </Btn>
            ))}
          </BtnGroup>
          <ExternalLink
            href={getStorageConfigById(manager.currentConfigId).urlToSite}
          >
            Link to providers site
          </ExternalLink>
        </FormItem>
      </div>
      <div style={{ marginTop: '20px' }}>
        <FormItem label="Token">
          {/* eslint-disable-next-line */}
          <Input
            value={
              manager.storageConfigs.find(x => x.id === manager.currentConfigId)
                ?.token
            }
            onChange={e => updateStorageToken(e.target.value)}
          />
        </FormItem>
      </div>
    </Card>
  );
};

export default StorageConfig;

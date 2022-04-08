import { FormItem, Input } from 'components/form';
import { ExternalLink } from 'components/general';
import { Card } from 'components/layout';
import { useStateManager } from 'outpost/state/useStateManager';
import styles from 'pages/gov/ProposalsByStatus.module.scss';

export const StorageConfig = () => {
  // FULL REFACTOR here.
  const { manager, updateStorageToken } = useStateManager();

  // useEffect(() => {
  //   updateManager({ ...manager });
  // }, []);

  return (
    <Card title="Storage options" className={styles.link}>
      <div style={{ marginTop: '20px' }}>
        <FormItem label="Variants">
          {/* <BtnGroup>
            {manager.storageConfigs.map(c => (
              <Btn
                key={c.id}
                variant={'contained'}
                onClick={() =>
                  updateManager({ ...manager, currentConfigId: c.id || 0 })
                }
              >
                {c.type}
              </Btn>
            ))}
          </BtnGroup> */}
          <ExternalLink href={manager.storageConfigs[0].urlToSite}>
            Obtain token here ➡️
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

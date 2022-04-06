import { Button as Btn, Button } from '@mui/material';
import { GetId } from '@outp0st/core';
import { Card } from 'components/layout';
import BtnGroup from 'outpost/components/ui/elements/BtnGroup';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { useStateManager } from 'outpost/state/useStateManager';
import styles from 'pages/gov/ProposalsByStatus.module.scss';
import { getStateTitle, makeFileObjects, storeFiles } from 'utils/outpost';

export const StateList = () => {
  const { manager, delState, upsertState } = useStateManager();
  const { outpostGlobal } = useOutpostState();
  const action = async () => {
    const stateTitle = getStateTitle(
      outpostGlobal.title,
      outpostGlobal[outpostGlobal.current].version,
    );
    const files = makeFileObjects(stateTitle, outpostGlobal);
    const cid = await storeFiles(
      files,
      manager.storageConfigs.find(x => x.type === 'web3.storage')?.token || '',
    );
    upsertState({
      id: GetId(),
      cid: cid,
      title: outpostGlobal[outpostGlobal.current].title,
      version: outpostGlobal[outpostGlobal.current].version,
      link: `https://dweb.link/ipfs/${cid}/${stateTitle}`,
    });
  };
  return (
    <Card title="State list" className={styles.link}>
      <div style={{ width: '100%' }}>
        <Btn
          size="small"
          onClick={async () => {
            try {
              action();
            } catch (ex) {
              console.error(ex);
            }
          }}
        >
          Save current state
        </Btn>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manager.states?.map(x => (
              <tr key={x.id}>
                <td>{x.title}</td>
                <td>
                  <a href={x.link}>Link to file</a>
                </td>
                <td>
                  <BtnGroup>
                    <Button onClick={() => delState(x.id || 0)}>Delete</Button>
                    <Button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${window.location.origin}/outpost?state=${x.link}#CONFIG`,
                        )
                      }
                    >
                      Share
                    </Button>
                  </BtnGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StateList;

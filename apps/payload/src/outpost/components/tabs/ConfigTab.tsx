import { Button as Btn } from '@mui/material';
import { FormItem, Input } from 'components/form';
import { Button } from 'components/general';
import { Card, Col } from 'components/layout';
import { useSaveLoad } from 'outpost/hooks/useSaveLoad';
import { useOutpostState } from 'outpost/state/useOutpostState';
import styles from 'pages/gov/ProposalsByStatus.module.scss';
import { FC, useEffect, useState } from 'react';
import BtnGroup from '../ui/elements/BtnGroup';
import { Environment } from './parts/Environment';
import StateList from './parts/StateList';
import StorageConfig from './parts/StorageConfig';
import Upload from './Upload';

const ConfigTab: FC = () => {
  const { saveState, loadState, resetState } = useSaveLoad();
  const [file, setFile] = useState<File | undefined>();
  const [msg, setMsg] = useState('');

  const { outpost, updateState } = useOutpostState();

  useEffect(() => {
    if (!file) return;
    loadState(file);
    setMsg('State restored!');
    setFile(undefined);
  }, [file, setMsg, loadState]);

  return (
    <div>
      <Col>
        <section className={styles.list}>
          <Card title="Current state manipulations" className={styles.link}>
            {/* eslint-disable-next-line */}
            <a id="downloadAnchorElem" style={{ display: 'none' }}></a>
            <Button onClick={() => saveState()}>Download</Button>
            <Button onClick={() => resetState()}>Reset</Button>
          </Card>
          <Card title="Load config from json" className={styles.link}>
            <Upload footerMessage={msg} value={file} onUpload={setFile} />
          </Card>
          <Card title="State settings" className={styles.link}>
            <div style={{ marginTop: '20px' }}>
              <FormItem label="State title">
                {/* eslint-disable-next-line */}
                <Input
                  value={outpost.title || ''}
                  onChange={e =>
                    updateState({ ...outpost, title: e.target.value })
                  }
                />
              </FormItem>
            </div>
            <div style={{ marginTop: '20px' }}>
              <FormItem label="State readonly">
                <BtnGroup>
                  <Btn
                    variant={outpost.isReadonly ? 'contained' : 'outlined'}
                    onClick={() =>
                      updateState({ ...outpost, isReadonly: true })
                    }
                  >
                    READ ONLY
                  </Btn>
                  <Btn
                    variant={!outpost.isReadonly ? 'contained' : 'outlined'}
                    onClick={() =>
                      updateState({ ...outpost, isReadonly: false })
                    }
                  >
                    ALLOW EDIT
                  </Btn>
                </BtnGroup>
              </FormItem>
            </div>
          </Card>
          {/* <ConfigParams /> */}
          <Environment />
          <StorageConfig />
          <StateList />
        </section>
      </Col>
    </div>
  );
};

export default ConfigTab;

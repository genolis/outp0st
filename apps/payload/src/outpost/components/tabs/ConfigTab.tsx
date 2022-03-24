import styles from 'pages/gov/ProposalsByStatus.module.scss';
import { FC, useEffect, useState } from 'react';
import { Card, Col } from 'components/layout';
import { useSaveLoad } from 'outpost/hooks/useSaveLoad';
import Upload from './Upload';
import { Button } from 'components/general';
import { FormItem, Input } from 'components/form';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { OutpostParam, OutpostParamsTypes } from 'outpost/state/model';
import { Button as Btn } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BtnGroup from '../ui/elements/BtnGroup';

const ConfigTab: FC = () => {
    const { saveState, loadState, resetState } = useSaveLoad();
    const [file, setFile] = useState<File | undefined>();
    const [msg, setMsg] = useState('');

    const { outpostApp, paramsCrud } = useOutpostState();
    const title = outpostApp('get', 'title');
    const isReadonly = outpostApp('get', 'isReadonly');
    const rows = (paramsCrud!.read() || []) as OutpostParam[];

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
                    <Card
                        title='Current state manipulations'
                        className={styles.link}>
                        {/* eslint-disable-next-line */}
                        <a
                            id='downloadAnchorElem'
                            style={{ display: 'none' }}></a>
                        <Button onClick={() => saveState()}>Download</Button>
                        <Button onClick={() => resetState()}>Reset</Button>
                    </Card>
                    <Card title='Load config from json' className={styles.link}>
                        <Upload
                            footerMessage={msg}
                            value={file}
                            onUpload={setFile}
                        />
                    </Card>
                    <Card title='State settings' className={styles.link}>
                        <div style={{ marginTop: '20px' }}>
                            <FormItem label='State title'>
                                {/* eslint-disable-next-line */}
                                <Input
                                    value={title}
                                    onChange={(e) =>
                                        outpostApp(
                                            'set',
                                            'title',
                                            e.target.value
                                        )
                                    }
                                />
                            </FormItem>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <FormItem label='State readonly'>
                                <BtnGroup>
                                    <Btn
                                        variant={
                                            isReadonly
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            outpostApp(
                                                'set',
                                                'isReadonly',
                                                true
                                            )
                                        }>
                                        READ ONLY
                                    </Btn>
                                    <Btn
                                        variant={
                                            !isReadonly
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            outpostApp(
                                                'set',
                                                'isReadonly',
                                                false
                                            )
                                        }>
                                        ALLOW EDIT
                                    </Btn>
                                </BtnGroup>
                            </FormItem>
                        </div>
                    </Card>
                    <Card title='App params' className={styles.link}>
                        <div style={{ width: '100%' }}>
                            <Btn
                                size='small'
                                onClick={() => {
                                    paramsCrud.create({
                                        id: 0,
                                        type: OutpostParamsTypes.STRING,
                                        title: 'New param',
                                        value: 'new value',
                                    });
                                }}>
                                Add a row
                            </Btn>
                            <DataGrid
                                editMode={'row'}
                                rows={rows}
                                density='compact'
                                columns={[
                                    {
                                        field: 'title',
                                        headerName: 'Title',
                                        editable: true,
                                    },
                                    {
                                        field: 'value',
                                        headerName: 'value',
                                        editable: true,
                                    },
                                    {
                                        field: 'type',
                                        headerName: 'type',
                                        editable: true,
                                        type: 'singleSelect',
                                        valueOptions: [
                                            OutpostParamsTypes.STRING,
                                            OutpostParamsTypes.NUM,
                                        ],
                                    },
                                ]}
                                onCellEditCommit={(params) =>
                                    paramsCrud.update(
                                        params as unknown as OutpostParam
                                    )
                                }
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                autoHeight
                            />
                        </div>
                    </Card>
                </section>
            </Col>
        </div>
    );
};

export default ConfigTab;

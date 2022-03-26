import { Button as Btn } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { OutpostParam, OutpostParamsTypes } from '@outpost/core';
import { Card } from 'components/layout';
import { useOutpostState } from 'outpost/state/useOutpostState';
import styles from 'pages/gov/ProposalsByStatus.module.scss';

export const ConfigParams = () => {
  const { paramsCrud } = useOutpostState();

  const rows = (paramsCrud!.read() || []) as OutpostParam[];
  return (
    <Card title="App params" className={styles.link}>
      <div style={{ width: '100%' }}>
        <Btn
          size="small"
          onClick={() => {
            paramsCrud.create({
              id: 0,
              type: OutpostParamsTypes.STRING,
              title: 'New param',
              value: 'new value',
            });
          }}
        >
          Add a row
        </Btn>
        <DataGrid
          editMode={'row'}
          rows={rows}
          density="compact"
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
              valueOptions: [OutpostParamsTypes.STRING, OutpostParamsTypes.NUM],
            },
          ]}
          onCellEditCommit={params =>
            paramsCrud.update(params as unknown as OutpostParam)
          }
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </Card>
  );
};

export default ConfigParams;

import { Collapse } from '@mui/material';
import { Contract } from '@outp0st/core';
import Tooltip from 'components/display/Tooltip';
// import Tx from "txs/Tx"
import { Form } from 'components/form';
import { ExternalLink, FinderLink } from 'components/general';
import { Grid } from 'components/layout';
import { useStoreContract } from 'outpost/hooks/useStoreContract';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { FC } from 'react';
import TxContext from 'txs/TxContext';
import Tx from '../../Tx';
import { EasyContract } from '../elements/EasyContract';
import Fetching from '../elements/Fetching';
import MarkdownEditor from '../elements/MarkdownEditor';
import styles from './OutpostCardContractBody.module.scss';
import OutpostCardContractHeader from './OutpostCardContractHeader';

interface COutpostCardContractBodyProps extends Contract {}

const OutpostCardContractBody: FC<COutpostCardContractBodyProps> = contract => {
  const { tx, handleSubmit } = useStoreContract(contract, 'STORE');
  const { updateContract } = useOutpostState();

  return (
    <div>
      <OutpostCardContractHeader contract={contract}>
        <Grid gap={32}>
          <header className={styles.header}>
            <Grid gap={4}>
              <h1>
                BinUrl
                <ExternalLink href={contract.binUrl} icon></ExternalLink>
              </h1>
              <div
                style={{
                  maxWidth: '250px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <EasyContract contract={contract} contractProp={'binUrl'} />
              </div>
            </Grid>
            <Grid gap={4}>
              <h1>Code id</h1>
              <div>
                <EasyContract
                  contract={contract}
                  contractProp={'codeId'}
                  isNum={true}
                />
              </div>
            </Grid>
            <Grid gap={4}>
              <h1>
                {contract.contractAddress ? (
                  <Tooltip content={'View on Terra Finder'}>
                    <FinderLink value={contract.contractAddress}>
                      Address
                    </FinderLink>
                  </Tooltip>
                ) : (
                  'Address'
                )}
              </h1>
              <div>
                <EasyContract
                  contract={contract}
                  contractProp={'contractAddress'}
                />
              </div>
            </Grid>
          </header>
          <Grid gap={4} className={styles.wrapper}>
            <MarkdownEditor
              val={contract.description}
              updateFn={(val: any) => {
                updateContract({
                  ...contract,
                  description: val,
                });
              }}
            />
          </Grid>

          {(contract.binUrl || contract.codeId) && (
            <Collapse in={!contract.collapsed} timeout="auto" unmountOnExit>
              <Grid gap={4} className={styles.wrapper}>
                {/* Do not translate this */}
                <h1>Store {contract.title}</h1>
                <TxContext>
                  <Tx {...tx}>
                    {({ fee, submit, resultQuery }) => (
                      <Fetching {...resultQuery}>
                        <Form onSubmit={handleSubmit(submit.fn)}>
                          {submit.button}
                          {fee.render()}
                        </Form>
                      </Fetching>
                    )}
                  </Tx>
                </TxContext>
              </Grid>
            </Collapse>
          )}
        </Grid>
      </OutpostCardContractHeader>
      {/* </Fetching> */}
    </div>
  );
};

export default OutpostCardContractBody;

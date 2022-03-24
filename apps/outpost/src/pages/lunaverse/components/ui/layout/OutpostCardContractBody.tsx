import { FC } from "react";
import { Grid } from "components/layout";
// import Tx from "txs/Tx"
import { Form } from "components/form";
import TxContext from "txs/TxContext";
import Tooltip from "components/display/Tooltip";
import { ExternalLink, FinderLink } from "components/general";

import { Contract } from "pages/lunaverse/state/model";
import styles from "./OutpostCardContractBody.module.scss";
import { EasyContract } from "../elements/EasyContract";
import { Collapse } from "@mui/material";
import OutpostCardContractHeader from "./OutpostCardContractHeader";
import { useStoreContract } from "pages/lunaverse/hooks/useStoreContract";
import { useOutpostState } from "pages/lunaverse/state/useOutpostState";
import MarkdownEditor from "../elements/MarkdownEditor";
import Tx from "../../Tx";
import Fetching from "../elements/Fetching";

interface COutpostCardContractBodyProps extends Contract {}

const OutpostCardContractBody: FC<COutpostCardContractBodyProps> = (
  contract
) => {
  const { tx, handleSubmit } = useStoreContract(contract, "STORE");
  const { updateContract } = useOutpostState();

  return (
    <div>
      <OutpostCardContractHeader contract={contract}>
        <Grid gap={32}>
          <header className={styles.header}>
            <Grid gap={4}>
              <h1>
                BinUrl<ExternalLink href={contract.binUrl} icon></ExternalLink>
              </h1>
              <div
                style={{
                  maxWidth: "250px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <EasyContract contract={contract} contractProp={"binUrl"} />
              </div>
            </Grid>
            <Grid gap={4}>
              <h1>Code id</h1>
              <div>
                <EasyContract
                  contract={contract}
                  contractProp={"codeId"}
                  isNum={true}
                />
              </div>
            </Grid>
            <Grid gap={4}>
              <h1>
                {contract.contractAddress ? (
                  <Tooltip content={"View on Terra Finder"}>
                    <FinderLink value={contract.contractAddress}>
                      Address
                    </FinderLink>
                  </Tooltip>
                ) : (
                  "Address"
                )}
              </h1>
              <div>
                <EasyContract
                  contract={contract}
                  contractProp={"contractAddress"}
                />
              </div>
            </Grid>
          </header>
          <Grid gap={4} className={styles.wrapper}>
            <MarkdownEditor
              val={contract.description}
              updateFn={(val: any) => {
                updateContract({ ...contract, description: val });
              }}
            />
          </Grid>

          {contract.binUrl && (
            <Collapse in={!contract.collapsed} timeout="auto" unmountOnExit>
              <Grid gap={4} className={styles.wrapper}>
                {/* Do not translate this */}
                <h1>Store {contract.title}</h1>
                <TxContext>
                  <Tx {...tx}>
                    {({ fee, submit, failMessage, resultQuery }) => (
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

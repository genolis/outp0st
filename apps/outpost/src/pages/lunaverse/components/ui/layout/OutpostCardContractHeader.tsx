import { FC } from "react"
import { Card } from "components/layout"
import { Button } from "components/general"
import { useOutpostState } from "pages/lunaverse/state/useOutpostState"
import { useNavigate } from "react-router-dom"

import { Contract } from "pages/lunaverse/state/model"
import styles from "./OutpostCardContractBody.module.scss"
import { EasyContract } from "../elements/EasyContract"
import { useRO } from "pages/lunaverse/hooks/useRO"

interface OutpostCardContractHeaderProps {
  contract: Contract
}

const OutpostCardContractHeader: FC<OutpostCardContractHeaderProps> = ({
  contract,
  children,
}) => {
  const { removeContract, updateContract } = useOutpostState()
  const navigate = useNavigate()
  const ro = useRO()
  return (
    <div>
      <Card
        title={
          <span>
            <EasyContract contract={contract} contractProp={"title"} />
          </span>
        }
        extra={
          <div>
            {contract.binUrl && (
              <Button
                onClick={() => {
                  updateContract({
                    ...contract,
                    collapsed: !contract.collapsed,
                  })
                }}
                size="small"
              >
                {contract.collapsed ? "show" : "hide"}
              </Button>
            )}
            {!ro && (
              <Button
                size="small"
                color="danger"
                onClick={() => {
                  const ok = window.confirm(
                    "are you sure you want to remove contract tab?"
                  )
                  if (ok) {
                    removeContract(contract.id)
                    navigate(-1)
                  }
                }}
              >
                Remove
              </Button>
            )}
          </div>
        }
        mainClassName={styles.main}
        bordered
      >
        {children}
      </Card>
    </div>
  )
}

export default OutpostCardContractHeader

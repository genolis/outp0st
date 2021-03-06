import { useTranslation } from "react-i18next"
import { useAddress } from "data/wallet"
import { Button, LinkButton } from "components/general"
import { ModalButton } from "components/feedback"
import { ExtraActions } from "components/layout"
import ContractQuery from "./ContractQuery"
import { useContract } from "./Contract"

const ContractItemActions = () => {
  const { t } = useTranslation()
  const connectedAddress = useAddress()
  const { address, admin } = useContract()

  return (
    <ExtraActions>
      <ModalButton
        title={t("Query")}
        renderButton={(open) => (
          <Button onClick={open} size="small" outline>
            {t("Query")}
          </Button>
        )}
      >
        <ContractQuery />
      </ModalButton>

      <LinkButton to={`/contract/execute/${address}`} size="small" outline>
        {t("Execute")}
      </LinkButton>

      {admin && connectedAddress === admin && (
        <LinkButton to={`/contract/migrate/${address}`} size="small" outline>
          {t("Migrate")}
        </LinkButton>
      )}
    </ExtraActions>
  )
}

export default ContractItemActions

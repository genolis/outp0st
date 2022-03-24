import { Contract } from "pages/lunaverse/state/model";
import { useOutpostState } from "pages/lunaverse/state/useOutpostState";
import EasyEdit, { Types } from "react-easy-edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRO } from "pages/lunaverse/hooks/useRO";

export interface EasyContractProps {
  contract: Contract;
  contractProp: keyof Contract;
  isNum?: boolean;
}

export function EasyContract({
  contract,
  contractProp,
  isNum,
}: EasyContractProps) {
  const { updateContract } = useOutpostState();
  const ro = useRO();
  return (
    <div>
      {!ro && (
        <EasyEdit
          type={Types.TEXT}
          onSave={(value: string | number) => {
            updateContract({
              ...contract,
              [contractProp]: isNum ? +value : value,
            });
          }}
          value={contract[contractProp]}
          saveButtonLabel={<CheckIcon />}
          cancelButtonLabel={<CancelIcon />}
        />
      )}
      {ro && contract[contractProp]}
    </div>
  );
}

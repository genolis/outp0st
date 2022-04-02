import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { Contract } from '@outp0st/core';
import { useRO } from 'outpost/hooks/useRO';
import { useOutpostState } from 'outpost/state/useOutpostState';
import EasyEdit, { Types } from 'react-easy-edit';

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

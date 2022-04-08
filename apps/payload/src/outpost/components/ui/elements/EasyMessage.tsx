import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { ContractMessage } from '@outp0st/core';
import { useRO } from 'outpost/hooks/useRO';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { ReactNode } from 'react';
import EasyEdit, { Types } from 'react-easy-edit';

export interface EasyMessageProps {
  message: ContractMessage;
  messageProp: keyof ContractMessage;
  isNum?: boolean;
  // https://github.com/giorgosart/react-easy-edit/blob/728eef724c9308de3fff100151f8c0de30e1fe3c/src/lib/EasyEdit.jsx#L467
  type?: string;
  options?: Array<SelectOption>;
  displayComponent?: ReactNode;
}

interface SelectOption {
  label: string;
  value: string;
}

function createTypeOptions(
  prop: keyof ContractMessage,
  options?: Array<SelectOption>,
) {
  if (prop === 'type')
    return [
      { label: 'Instantiate', value: 'INSTA' },
      { label: 'Execute', value: 'EXECUTE' },
      { label: 'Query', value: 'QUERY' },
    ];
  else return options;
}

export function EasyMessage({
  message,
  messageProp,
  isNum,
  type,
  options,
  displayComponent,
}: EasyMessageProps) {
  const { updateMessage } = useOutpostState();
  const ro = useRO();
  return (
    <div>
      {!ro && (
        <EasyEdit
          type={type ? type : Types.TEXT}
          onSave={(value: string | SelectOption) => {
            // const val = messageProp === 'type' ? (value as SelectOption).value : value;
            updateMessage({
              ...message,
              [messageProp]: isNum ? +value : value,
            });
          }}
          options={createTypeOptions(messageProp, options)}
          displayComponent={displayComponent}
          value={message[messageProp]}
          saveButtonLabel={<CheckIcon />}
          cancelButtonLabel={<CancelIcon />}
        />
      )}
      {ro && message[messageProp]}
    </div>
  );
}

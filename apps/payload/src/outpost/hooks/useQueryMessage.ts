import { Contract, ContractMessage } from '@outpost/core';
import { useGetContractQuery } from 'data/queries/wasm';
import { isEmpty } from 'ramda';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { parseJSON, validateMsg } from 'utils/data';
import { getErrorMessage } from 'utils/error';
import { useOutpostState } from '../state/useOutpostState';

interface Values {
  msg: string;
}

// https://stackoverflow.com/questions/62759505/typescript-ts7053-element-implicitly-has-an-any-type-because-expression
export function useQueryMessage(message: ContractMessage) {
  const queryMsg = message.message;
  const { getContract, updateMessage } = useOutpostState();
  const contract = getContract(message.contractId) as Contract;
  /* form */
  const form = useForm<Values>({
    mode: 'onChange',
    defaultValues: {
      msg: queryMsg,
    },
  });
  const { register, watch, handleSubmit } = form;
  const { msg } = watch();
  const invalid = msg && !parseJSON(msg);
  const disabled = !validateMsg(msg);

  /* query */
  const getContractQuery = useGetContractQuery();

  const query = queryMsg;
  const address = contract?.contractAddress;

  const { data, error, ...state } = useQuery({
    ...getContractQuery<object>(address, parseJSON(query || '{}')),
    enabled: !isEmpty(query),
    retry: false,
  });

  const errorMessage = getErrorMessage(error);

  /* submit */
  const submit = ({ msg }: Values) => {
    const parsed = parseJSON(msg);
    if (parsed)
      updateMessage({ ...message, message: JSON.stringify(parsed, null, 2) });
  };

  return {
    submit,
    handleSubmit,
    state,
    register,
    invalid,
    data,
    message,
    disabled,
    errorMessage,
  };
}

import { Contract, ContractMessage } from '@outpost/core';
import { MsgInstantiateContract } from '@terra-money/terra.js';
import { useBankBalance } from 'data/queries/bank';
import { useAddress } from 'data/wallet';
import { useCallback, useMemo } from 'react';
import { getInitialGasDenom } from 'txs/Tx';
import { getCoins } from 'txs/utils';
import { parseJSON, validateMsg } from 'utils/data';
import { useOutpostState } from '../state/useOutpostState';
import { useUpdateAfterTx } from './useUpdateAfterTx';
// import { useDebounceCallback } from '@react-hook/debounce';

export function useInstaMessageStation(message: ContractMessage): any {
  const address = useAddress();
  const bankBalance = useBankBalance();
  const { getContract } = useOutpostState();
  const contract = getContract(message.contractId) as Contract;
  useUpdateAfterTx(contract, 'INSTA');
  const msg = message.message;
  const id = contract.codeId;
  /* tx context */
  const initialGasDenom = getInitialGasDenom(bankBalance);

  /* form */

  /* tx */
  const createTx = useCallback(() => {
    const defaultItem = { input: 0, denom: initialGasDenom };
    if (!address || !(id && msg)) return;
    if (!validateMsg(msg)) return;

    const code_id = Number(id);
    const init_msg = parseJSON(msg);
    // TODO add tokens
    const coins = getCoins([defaultItem]);
    const msgs = [
      new MsgInstantiateContract(
        address,
        contract.admin || address,
        code_id,
        init_msg,
        coins,
      ),
    ];

    return { msgs };
  }, [address, msg, id, initialGasDenom, contract.admin]);

  /* fee */
  const estimationTxValues = useMemo(() => [msg, id], [msg, id]);

  const tx = {
    initialGasDenom,
    estimationTxValues,
    createTx,
  };

  return {
    tx,
    contract,
  };
}

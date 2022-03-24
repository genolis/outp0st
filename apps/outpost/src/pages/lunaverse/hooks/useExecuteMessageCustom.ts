import { useCallback, useMemo } from 'react';
import { useAddress } from 'data/wallet';
import { Coins } from '@terra-money/terra.js';
import { Contract, ContractMessage } from '../state/model';
import { validateMsg, parseJSON } from 'utils/data';
import { getCoins } from 'txs/utils';
import { useOutpostState } from '../state/useOutpostState';
import { getInitialGasDenom } from 'txs/Tx';
import { useBankBalance } from 'data/queries/bank';

export function useExecuteMessageCustom(
  message: ContractMessage,
  createMessagesFn: (
    address: string,
    contractAddress: string,
    exec_msg: any,
    coins: Coins
  ) => any[]
): any {
  const { getContract } = useOutpostState();
  const bankBalance = useBankBalance();
  const contract = getContract(message.contractId) as Contract;
  //useUpdateAfterTx(contract, constType);
  const msg = message.message;
  const { contractAddress } = contract;
  const address = useAddress();

  const initialGasDenom = getInitialGasDenom(bankBalance);
  const createTxInsta = useCallback(() => {
    const defaultItem = { input: 0, denom: initialGasDenom };
    if (!address || !(contractAddress && msg)) return;
    if (!validateMsg(msg)) return;
    if (!defaultItem) return;

    const exec_msg = parseJSON(msg);
    const coins = getCoins([defaultItem]);
    const msgs = createMessagesFn(address, contractAddress!, exec_msg, coins); //[new MsgExecuteContract(address, contractAddress!, exec_msg, coins)];

    return { msgs };
  }, [address, contractAddress, msg, initialGasDenom, createMessagesFn]);
  const estimationTxValues = useMemo(
    () => [msg, contractAddress],
    [msg, contractAddress]
  );
  const createTx = createTxInsta;
  const tx = {
    initialGasDenom,
    estimationTxValues,
    createTx,
  };

  return { tx };
}

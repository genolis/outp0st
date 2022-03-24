import { latestTxState, useTxInfo } from 'data/queries/tx';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { CONSTANTS, TXType } from '../state/constants';
import { Contract } from '../state/model';
import { useOutpostState } from '../state/useOutpostState';

export function useUpdateAfterTx(contract: Contract, constantKey: keyof TXType) {
  const { updateContract } = useOutpostState();
  const { updateKey, logType, attrKey, isInt } = CONSTANTS.TX[constantKey];

  const latestTx = useRecoilValue(latestTxState);
  const { data, isSuccess } = useTxInfo(latestTx);

  // check some data after last transaction
  useEffect(() => {
    if (!isSuccess || !updateKey || !logType || !attrKey) return;
    const cleanData = data as any;
    const logs = cleanData.logs.find(
      (x: any) => Object.keys(x.eventsByType).indexOf(logType!) !== -1
    );

    const entry = logs?.eventsByType[logType];
    //console.log({ logs, entry });
    if (entry && entry[attrKey] && entry[attrKey].length > 0) {
      const rowValue = entry[attrKey][0];
      const value = isInt ? parseInt(rowValue) : rowValue;
      //console.log({ value, objectUpdateKey });
      // lets check if value is already here
      if (value === contract[updateKey]) return;
      updateContract({ ...contract, [updateKey]: value });
    }
  }, [data, isSuccess, updateContract, contract, updateKey, isInt, logType, attrKey]);
}

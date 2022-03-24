import { useCallback } from "react";
import { useAddress } from "data/wallet";
import { MsgStoreCode } from "@terra-money/terra.js";
import { readFileUrl } from "pages/lunaverse/utils";
import { useUpdateAfterTx } from "./useUpdateAfterTx";
import { Contract } from "../state/model";
import { CONSTANTS, StoreTxValues, TXType } from "../state/constants";
import { useOutpostForm } from "./useOutpostForm";

export function useStoreContract(
  contract: Contract,
  constType: keyof TXType
): any {
  //console.log(contract, constType)
  useUpdateAfterTx(contract, constType);

  const address = useAddress();
  const saveFn = async (setValue: any) =>
    setValue("code", await readFileUrl(contract.binUrl || ""));

  const { initialGasDenom, estimationTxValues, handleSubmit } = useOutpostForm(
    contract[CONSTANTS.TX[constType].updateKey],
    saveFn
  );
  const createTxStore = useCallback(
    ({ code }: StoreTxValues) => {
      if (!address || !code) return;
      const msgs = [new MsgStoreCode(address, code)];
      return { msgs };
    },
    [address]
  );

  const createTx = createTxStore;
  const tx = {
    initialGasDenom,
    estimationTxValues,
    createTx,
  };

  return { tx, handleSubmit };
}

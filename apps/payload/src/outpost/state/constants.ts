import { Contract } from './model';

export const CONSTANTS: CONSTType = {
  version: '1.0.0',
  TX: {
    STORE: {
      updateKey: 'codeId',
      logType: 'store_code',
      attrKey: 'code_id',
      isInt: true
    },
    INSTA: {
      updateKey: 'contractAddress',
      logType: 'instantiate_contract',
      attrKey: 'contract_address',
      isInt: false
    },
    EXECUTE: {
      updateKey: 'additionalContractAddress',
      logType: '',
      attrKey: '',
      isInt: false
    }
  }
};

export interface CONSTType {
  version: string;
  TX: TXType;
}

export interface TXType {
  STORE: BASEType;
  INSTA: BASEType;
  EXECUTE: BASEType;
}

export interface BASEType {
  updateKey: keyof Contract;
  logType: string;
  attrKey: string;
  isInt: boolean;
}

export interface StoreTxValues {
  code: string;
}

export interface InstaTxValues {
  admin?: string;
  id?: number;
  msg?: string;
  coins: { input?: number; denom: CoinDenom }[];
}

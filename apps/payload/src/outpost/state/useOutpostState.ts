import {
  Contract,
  ContractMessage,
  GetId,
  Outpost,
  OutpostParam,
  OutpostParamsTypes,
} from '@outpost/core';
import { atom, useRecoilState } from 'recoil';
import {
  getLocalSetting,
  setLocalSetting,
  SettingKey,
} from '../utils/localStorage';
import { useCRUDFactory } from './useCRUDFactory';

const outpostState = atom({
  key: 'outpostState',
  default: getLocalSetting<Outpost>(SettingKey.outpost),
});

export const getId = () => {
  return GetId();
};

export const useOutpostState = () => {
  const [state, setState] = useRecoilState<Outpost>(outpostState);

  //const validateName = (name: string) => !list.some((item) => item.name === name);

  // use it to modify title, version and so on
  const outpostApp = (
    action: 'get' | 'set',
    key: keyof Outpost,
    value?: any,
  ): undefined | any => {
    if (action === 'get') {
      return state[key];
    } else if (action === 'set') {
      updateState({ ...state, [key]: value });
    }
  };

  const updateState = (newState: Outpost) => {
    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    const sortedContracts = [...newState.contracts].sort(
      (a: Contract, b: Contract) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      },
    );

    const sortedState = {
      ...newState,
      contracts: [...sortedContracts],
    };
    // console.trace()
    // refactor? this to preserve state params like title, version, and other - which are not updated in things like removeContract and so on
    const finalState = { ...state, ...sortedState };
    setState(finalState);
    setLocalSetting(SettingKey.outpost, finalState);
  };

  const paramsCrud = useCRUDFactory<Outpost, OutpostParam>(
    state,
    'params',
    updateState,
  );

  const getParam = ({ id, title }: { id?: number; title?: string }) => {
    if ((!id || id < 1) && !title) return;
    let value: OutpostParam | undefined;
    const params = paramsCrud.read() as OutpostParam[];
    if (title) value = params.find(x => x.title === title);
    else if (id) value = params.find(x => x.id === id);
    return value;
  };

  const updateOrAddParam = (
    title: string,
    value: any,
    type: OutpostParamsTypes,
  ) => {
    const param = getParam({ title });
    if (!param) {
      paramsCrud.create({
        id: 0,
        title: title,
        value: value,
        type: type,
      });
    } else {
      paramsCrud.update({ ...param, value: value });
    }
  };

  const removeParam = ({ id, title }: { id?: number; title?: string }) => {
    if ((!id || id < 1) && !title) return;
    let param = getParam({ id, title });
    if (!param) return;
    paramsCrud.del(param);
  };

  const move = (
    direction: 'up' | 'down',
    msg: ContractMessage,
    okFn?: any,
    falseFn?: any,
  ) => {
    const contract = getContract(msg.contractId);
    if (!contract || !contract.messages || contract.messages.length === 0)
      return;
    const contractMessages = [...contract.messages];
    if (!contractMessages || contractMessages.length === 0) return;
    const fromIndex = contractMessages.findIndex(id => id === msg.id);
    if (fromIndex === -1) return;
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (
      (direction === 'down' && toIndex <= contractMessages.length - 1) ||
      (direction === 'up' && toIndex >= 0)
    ) {
      return okFn(contractMessages, contract, toIndex, fromIndex);
    } else {
      return falseFn(contractMessages, contract, toIndex, fromIndex);
    }
  };

  const moveMessage = (direction: 'up' | 'down', msg: ContractMessage) => {
    //debugger;

    move(
      direction,
      msg,
      (
        contractMessages: number[],
        contract: Contract,
        toIndex: number,
        fromIndex: number,
      ) => {
        contractMessages.splice(
          toIndex,
          0,
          contractMessages.splice(fromIndex, 1)[0],
        );
        updateContract({ ...contract, messages: [...contractMessages] });
      },
    );
  };

  const canMessageMove = (direction: 'up' | 'down', msg: ContractMessage) => {
    //debugger;
    return move(
      direction,
      msg,
      () => {
        return true;
      },
      () => {
        return false;
      },
    );
  };

  const getContracts = () => {
    return state.contracts;
  };
  const addContract = (newItem: Contract) => {
    const id = getId();
    updateState({
      ...state,
      contracts: [
        ...state.contracts,
        {
          ...newItem,
          id,
        },
      ],
    });
    return id;
  };

  const updateContract = (updated: Contract) => {
    updateState({
      ...state,
      contracts: [
        ...state.contracts.filter(item => item.id !== updated.id),
        {
          ...updated,
        },
      ],
    });
  };

  const addContractMessageId = (contractId: number, messageId: number) => {
    const updated = getContract(contractId);
    if (!updated) return;
    updateState({
      ...state,
      contracts: [
        ...state.contracts,
        {
          ...updated,
          messages: [...updated.messages, messageId],
        },
      ],
    });
  };

  const removeContractMessageId = (contractId: number, messageId: number) => {
    const updated = getContract(contractId);
    if (!updated) return;
    updateState({
      ...state,
      contracts: [
        ...state.contracts,
        {
          ...updated,
          messages: updated.messages.filter(item => item !== messageId),
        },
      ],
    });
  };

  const removeContract = (id: number) => {
    const contractToRemoveMessagesIds = getContract(id)?.messages;
    updateState({
      messages: state.messages.filter(
        item => contractToRemoveMessagesIds?.indexOf(item.id) === -1,
      ),
      contracts: state.contracts.filter(item => item.id !== id),
    });
  };

  const getContract = (id: number) => {
    return state.contracts.find(item => item.id === id);
  };

  const addMessage = (newItem: ContractMessage) => {
    const id = getId();
    const updated = getContract(newItem.contractId);
    if (!updated) return;
    updateState({
      contracts: [
        ...state.contracts.filter(item => item.id !== newItem.contractId),
        {
          ...updated,
          messages: [...updated.messages, id],
        },
      ],
      messages: [
        ...state.messages,
        {
          ...newItem,
          id,
        },
      ],
    });
    return id;
  };

  const updateMessage = (updated: ContractMessage) => {
    //removeContract(updated.id!);
    //console.log({ updated });
    updateState({
      ...state,
      messages: [
        ...state.messages.filter(item => item.id !== updated.id),
        {
          ...updated,
        },
      ],
    });
  };

  const getMessage = (id: number) => {
    return state.messages.find(item => item.id === id);
  };
  const getMessagesByContractId = (id: number) => {
    return state.messages.map(item => (item.contractId === id ? item : false));
  };
  const removeMessage = (id: number) => {
    const messageToRemove = getMessage(id);
    if (!messageToRemove) return;
    const updated = getContract(messageToRemove.contractId);

    if (!updated) return;
    updateState({
      contracts: [
        ...state.contracts.filter(item => item.id !== updated.id),
        {
          ...updated,
          messages: updated.messages.filter(item => item !== id),
        },
      ],
      messages: state.messages.filter(item => item.id !== id),
    });
  };

  return {
    getMessagesByContractId,
    addContract,
    updateContract,
    addContractMessageId,
    removeContractMessageId,
    removeContract,
    getContract,
    addMessage,
    updateMessage,
    getMessage,
    removeMessage,
    getContracts,
    outpost: state,
    updateState,
    moveMessage,
    canMessageMove,
    outpostApp,
    paramsCrud,
    getParam,
    updateOrAddParam,
    removeParam,
  };
};

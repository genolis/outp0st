import {
  Contract,
  ContractMessage,
  GetId,
  Outpost,
  OutpostCurrentState,
  OutpostGlobal,
  OutpostMeta,
} from '@outp0st/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  contractsAtomFamily,
  currentEnvAtom,
  globalTitleAtom,
  messagesAtomFamily,
  metaAtomFamily,
} from './atoms';
import { currentOutpostSelector, outpostGlobalSelector } from './selectors';

export const getId = () => {
  return GetId();
};

export const useOutpostState = () => {
  const [currentEnv, setCurrentEnv] = useRecoilState(currentEnvAtom);
  const [contracts, setContracts] = useRecoilState(
    contractsAtomFamily(currentEnv),
  );
  const [messages, setMessages] = useRecoilState(
    messagesAtomFamily(currentEnv),
  );
  const [meta, setMeta] = useRecoilState(metaAtomFamily(currentEnv));
  const [, setGlobalTitle] = useRecoilState(globalTitleAtom);

  // Selectors for backward-compatible derived state
  const outpost = useRecoilValue(currentOutpostSelector);
  const outpostGlobal = useRecoilValue(outpostGlobalSelector);

  // Atom setters for all three environments (needed by updateGlobalState)
  const [, setMainContracts] = useRecoilState(
    contractsAtomFamily(OutpostCurrentState.MAIN),
  );
  const [, setMainMessages] = useRecoilState(
    messagesAtomFamily(OutpostCurrentState.MAIN),
  );
  const [, setMainMeta] = useRecoilState(
    metaAtomFamily(OutpostCurrentState.MAIN),
  );
  const [, setTestContracts] = useRecoilState(
    contractsAtomFamily(OutpostCurrentState.TEST),
  );
  const [, setTestMessages] = useRecoilState(
    messagesAtomFamily(OutpostCurrentState.TEST),
  );
  const [, setTestMeta] = useRecoilState(
    metaAtomFamily(OutpostCurrentState.TEST),
  );
  const [, setLocalContracts] = useRecoilState(
    contractsAtomFamily(OutpostCurrentState.LOCAL),
  );
  const [, setLocalMessages] = useRecoilState(
    messagesAtomFamily(OutpostCurrentState.LOCAL),
  );
  const [, setLocalMeta] = useRecoilState(
    metaAtomFamily(OutpostCurrentState.LOCAL),
  );

  const envSetters: Record<
    OutpostCurrentState,
    {
      setContracts: (v: Contract[]) => void;
      setMessages: (v: ContractMessage[]) => void;
      setMeta: (v: OutpostMeta) => void;
    }
  > = {
    [OutpostCurrentState.MAIN]: {
      setContracts: setMainContracts,
      setMessages: setMainMessages,
      setMeta: setMainMeta,
    },
    [OutpostCurrentState.TEST]: {
      setContracts: setTestContracts,
      setMessages: setTestMessages,
      setMeta: setTestMeta,
    },
    [OutpostCurrentState.LOCAL]: {
      setContracts: setLocalContracts,
      setMessages: setLocalMessages,
      setMeta: setLocalMeta,
    },
  };

  // --- Backward-compatible shims ---

  const outpostApp = (
    action: 'get' | 'set',
    key: keyof Outpost,
    value?: any,
  ): undefined | any => {
    if (action === 'get') {
      if (key === 'contracts') return contracts;
      if (key === 'messages') return messages;
      return meta[key as keyof OutpostMeta];
    } else if (action === 'set') {
      if (key === 'contracts') {
        setContracts(value);
      } else if (key === 'messages') {
        setMessages(value);
      } else {
        setMeta(prev => ({ ...prev, [key]: value }));
      }
    }
  };

  const switchCurrentState = (env: OutpostCurrentState) => {
    setCurrentEnv(env);
  };

  /**
   * Backward-compatible updateState: decomposes an Outpost into atoms.
   * Safe even with partial objects (the #25 bug pattern) because meta
   * only updates when meta fields are explicitly provided.
   */
  const updateState = (newState: Outpost) => {
    if (newState.contracts !== undefined) {
      setContracts(newState.contracts);
    }
    if (newState.messages !== undefined) {
      setMessages(newState.messages);
    }
    setMeta(prev => ({
      title: newState.title !== undefined ? newState.title : prev.title,
      version: newState.version !== undefined ? newState.version : prev.version,
      params: newState.params !== undefined ? newState.params : prev.params,
      isReadonly:
        newState.isReadonly !== undefined
          ? newState.isReadonly
          : prev.isReadonly,
    }));
  };

  /**
   * Backward-compatible updateGlobalState: distributes an OutpostGlobal
   * across all environment atoms.
   */
  const updateGlobalState = (globalState: OutpostGlobal) => {
    setCurrentEnv(globalState.current);
    setGlobalTitle(globalState.title);

    for (const env of [
      OutpostCurrentState.MAIN,
      OutpostCurrentState.TEST,
      OutpostCurrentState.LOCAL,
    ]) {
      const envState = globalState[env];
      if (!envState) continue;
      const setters = envSetters[env];
      setters.setContracts(envState.contracts ?? []);
      setters.setMessages(envState.messages ?? []);
      setters.setMeta({
        title: envState.title,
        version: envState.version,
        params: envState.params,
        isReadonly: envState.isReadonly,
      });
    }
  };

  // --- Contract operations ---

  const getContracts = () => outpost.contracts;

  const getContract = (id: number) =>
    outpost.contracts.find(item => item.id === id);

  const addContract = (newItem: Contract) => {
    const id = getId();
    setContracts(prev => [...prev, { ...newItem, id }]);
    return id;
  };

  const updateContract = (updated: Contract) => {
    setContracts(prev => [
      ...prev.filter(item => item.id !== updated.id),
      { ...updated },
    ]);
  };

  const removeContract = (id: number) => {
    const contract = getContract(id);
    if (!contract) return;
    const messageIds = contract.messages;
    setContracts(prev => prev.filter(item => item.id !== id));
    setMessages(prev =>
      prev.filter(item => messageIds.indexOf(item.id) === -1),
    );
  };

  const addContractMessageId = (contractId: number, messageId: number) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === contractId
          ? { ...c, messages: [...c.messages, messageId] }
          : c,
      ),
    );
  };

  const removeContractMessageId = (contractId: number, messageId: number) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === contractId
          ? { ...c, messages: c.messages.filter(item => item !== messageId) }
          : c,
      ),
    );
  };

  // --- Message operations ---

  const getMessage = (id: number) => messages.find(item => item.id === id);

  const getMessagesByContractId = (id: number) =>
    messages.map(item => (item.contractId === id ? item : false));

  const addMessage = (newItem: ContractMessage) => {
    const id = getId();
    const contract = getContract(newItem.contractId);
    if (!contract) return;
    setContracts(prev => [
      ...prev.filter(item => item.id !== newItem.contractId),
      { ...contract, messages: [...contract.messages, id] },
    ]);
    setMessages(prev => [...prev, { ...newItem, id }]);
    return id;
  };

  const updateMessage = (updated: ContractMessage) => {
    setMessages(prev => [
      ...prev.filter(item => item.id !== updated.id),
      { ...updated },
    ]);
  };

  const removeMessage = (id: number) => {
    const messageToRemove = getMessage(id);
    if (!messageToRemove) return;
    const contract = getContract(messageToRemove.contractId);
    if (!contract) return;
    setContracts(prev => [
      ...prev.filter(item => item.id !== contract.id),
      { ...contract, messages: contract.messages.filter(item => item !== id) },
    ]);
    setMessages(prev => prev.filter(item => item.id !== id));
  };

  // --- Message reordering ---

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
    return move(
      direction,
      msg,
      () => true,
      () => false,
    );
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
    outpost,
    updateState,
    moveMessage,
    canMessageMove,
    outpostApp,
    switchCurrentState,
    outpostGlobal,
    updateGlobalState,
  };
};

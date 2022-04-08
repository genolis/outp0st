import { StateManager, StateStorage, StorageConfig } from 'types';

export function StateManagerService(
  state: StateManager,
  updateState: (data: StateManager) => StateManager,
) {
  const updateStorageToken = (token: string): StateManager => {
    const storageConfig = getStorageConfigById(state.currentConfigId);
    const newStorageConfigs = [
      ...state.storageConfigs.filter(x => x.id !== state.currentConfigId),
      { ...storageConfig, token },
    ];

    return updateState({ ...state, storageConfigs: newStorageConfigs });
  };
  const getStorageConfigById = (id: number): StorageConfig | undefined =>
    state.storageConfigs.find(x => x.id === id);

  const getStateById = (id: number): StateStorage | undefined =>
    state.states!.find(x => x.id === id);

  const upsertState = (item: StateStorage): StateManager | undefined => {
    const selectedState = getStateById(item.id!);
    if (!state.states) return;
    if (!selectedState) {
      return updateState({ ...state, states: [...state.states, item] });
    } else {
      return updateState({
        ...state,
        states: [...state.states.filter(x => x.id !== item.id), item],
      });
    }
  };
  const delState = (id: number) => {
    return updateState({
      ...state,
      states: [...state.states!.filter(x => x.id !== id)],
    });
  };

  return {
    updateStorageToken,
    getStorageConfigById,
    getStateById,
    upsertState,
    delState,
  };
}

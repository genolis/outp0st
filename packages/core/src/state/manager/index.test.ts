import test from 'ava';
import { StateManager } from '../../types';
import { GetId } from '../../utils';
import { StateManagerService } from './index';

const initId = GetId();
const secondId = initId + 1;
const initState: StateManager = {
  storageConfigs: [
    { id: initId, type: 'web3.storage', token: '' },
    { id: secondId, type: 'nft.storage', token: '' },
  ],
  states: [],
  currentConfigId: initId,
};

const wrapState = newState => {
  return StateManagerService(newState, updateState);
};

const updateState = data => {
  return { ...data };
};

test('StateManagerService init', async t => {
  const actions = StateManagerService(initState, updateState);
  t.truthy(actions.updateStorageToken);
});

test('StateManagerService change token', async t => {
  const actions = StateManagerService(initState, updateState);
  const result: StateManager = actions.updateStorageToken('test1');
  const resultConfig = result.storageConfigs.find(x => x.id === initId);
  t.is(resultConfig.token, 'test1');
});

test('StateManagerService change selected config and change token', async t => {
  const actions = StateManagerService(
    { ...initState, currentConfigId: secondId },
    updateState,
  );
  const result: StateManager = actions.updateStorageToken('test2');
  const resultConfig = result.storageConfigs.find(x => x.id === secondId);
  t.is(resultConfig.token, 'test2');
});

test('StateManagerService upsert state', async t => {
  const actions = StateManagerService({ ...initState }, updateState);
  const newStateId = GetId();
  const result: StateManager = actions.upsertState({
    id: newStateId,
    title: 'test',
  });
  const resultState = result.states[0];
  t.is(resultState.title, 'test');
  const updatedResult = actions.upsertState({
    id: newStateId,
    title: 'test_updated',
  });
  const rupdatedResultState = updatedResult.states[0];
  t.is(rupdatedResultState.title, 'test_updated');
});

test('StateManagerService get state', async t => {
  const actions = StateManagerService({ ...initState }, updateState);
  const newStateId = GetId();
  const result: StateManager = actions.upsertState({
    id: newStateId,
    title: 'test',
  });

  const resultState = StateManagerService(result, updateState).getStateById(
    newStateId,
  );
  t.is(resultState.title, 'test');
});

test('StateManagerService del state', async t => {
  const actions = StateManagerService({ ...initState }, updateState);
  const newStateId = GetId();
  const result: StateManager = actions.upsertState({
    id: newStateId,
    title: 'test',
  });
  const check = wrapState(result).getStateById(newStateId);
  t.truthy(check);
  const resultState = wrapState(result).delState(newStateId);
  const deletedStateResult = wrapState(resultState).getStateById(newStateId);
  t.falsy(deletedStateResult);
});

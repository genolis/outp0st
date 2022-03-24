import { getId } from './useOutpostState';

export function useCRUDFactory<T, V>(state: T, key: keyof T, updateState: any) {
  const create = (newItem: V) => {
    const id = getId();
    updateState({
      ...state,
      [key]: [
        ...(state[key] as unknown as any[]),
        {
          ...newItem,
          id,
        },
      ],
    });
    return id;
  };
  const read = () => {
    return state[key];
  };
  const update = (updated: V) => {
    updateState({
      ...state,
      [key]: [
        ...(state[key] as unknown as any[]).filter(
          (item) => item.id !== (updated as any).id
        ),
        {
          ...updated,
        },
      ],
    });
  };
  const del = (deleted: V) => {
    updateState({
      ...state,
      [key]: [
        ...(state[key] as unknown as any[]).filter(
          (item) => item.id !== (deleted as any).id
        ),
      ],
    });
  };

  return { create, read, update, del };
}

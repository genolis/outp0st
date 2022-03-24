import { useOutpostState } from "../state/useOutpostState"

export function useRO() {
  const { outpostApp } = useOutpostState()
  return outpostApp("get", "isReadonly")
}

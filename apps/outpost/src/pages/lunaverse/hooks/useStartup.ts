import { useComptability } from "./useComptability"
import { useHashParser } from "./useHashParser"
import { useLoadState } from "./useLoadState"
import { useShowMessage } from "./useShowMessage"

export function useStartup() {
  useLoadState()
  useComptability()
  const { messageId } = useHashParser()
  useShowMessage(messageId)
}

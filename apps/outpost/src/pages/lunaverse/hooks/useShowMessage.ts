import { useEffect } from "react"
import { ContractMessage } from "../state/model"
import { useOutpostSettings } from "../state/useOutpostSettings"
import { useOutpostState } from "../state/useOutpostState"

export function useShowMessage(messageId: number | undefined) {
  const { updateState, getContract, getMessage, outpost } = useOutpostState()
  const { settings } = useOutpostSettings()
  useEffect(() => {
    if (!messageId) return
    const message = getMessage(messageId)
    if (!message) return
    const contract = getContract(message.contractId)
    if (!contract) return

    const closedMessages = contract.messages.map((toCloseId) => {
      const toClose = getMessage(toCloseId)
      if (toCloseId !== messageId) return { ...toClose, collapsed: true }
      else return { ...toClose, collapsed: false }
    }) as ContractMessage[]
    // for the sake of time economy :( will refactor this in react optimisation task
    updateState({
      ...outpost,
      messages: [
        ...outpost.messages.filter((item) => {
          return contract.messages.indexOf(item.id) === -1
        }),
        ...closedMessages,
      ],
    })

    // eslint-disable-next-line
  }, [settings.stateLoadSwitcher])
}

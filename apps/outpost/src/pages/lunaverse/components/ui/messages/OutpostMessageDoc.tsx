import { ContractMessage } from "pages/lunaverse/state/model"
import { useOutpostState } from "pages/lunaverse/state/useOutpostState"
import MarkdownEditor from "../elements/MarkdownEditor"

interface OutpostMessageDocProps {
  message: ContractMessage
}

export default function OutpostMessageDoc({ message }: OutpostMessageDocProps) {
  const { updateMessage } = useOutpostState()
  return (
    <div>
      <MarkdownEditor
        val={message.description}
        updateFn={(val: any) => {
          updateMessage({ ...message, description: val })
        }}
      />
    </div>
  )
}

import { FC } from "react"
import { useOutpostState } from "pages/lunaverse/state/useOutpostState"

import {
  ContractExecuteMultiMessageTypes,
  ContractMessage,
  ContractMessageRenderModes,
  ContractMessageTypes,
} from "pages/lunaverse/state/model"

import { Button, Collapse } from "@mui/material"
import BtnGroup from "../../elements/BtnGroup"
import { useRO } from "pages/lunaverse/hooks/useRO"

interface OutpostCardMessageBodyProps {
  message: ContractMessage
}

const generateButtons = (message: ContractMessage, updateMessage: any) => {
  let buttons = []
  for (let item in ContractMessageTypes) {
    buttons.push(
      <Button
        key={item}
        variant={message.type === item ? "contained" : "outlined"}
        onClick={() => updateMessage({ ...message, type: item })}
      >
        {item}
      </Button>
    )
  }
  return buttons
}

const generateButtonsRender = (
  message: ContractMessage,
  updateMessage: any
) => {
  let buttons = []
  for (let item in ContractMessageRenderModes) {
    buttons.push(
      <Button
        key={item}
        variant={message.renderMode === item ? "contained" : "outlined"}
        onClick={() => updateMessage({ ...message, renderMode: item })}
      >
        {item}
      </Button>
    )
  }
  return buttons
}

const generateButtonsMulti = (message: ContractMessage, updateMessage: any) => {
  let buttons = []
  for (let item in ContractExecuteMultiMessageTypes) {
    buttons.push(
      <Button
        key={item}
        variant={message.multiType === item ? "contained" : "outlined"}
        onClick={() => updateMessage({ ...message, multiType: item })}
      >
        {item}
      </Button>
    )
  }
  return buttons
}

const OutpostCardMessageBody: FC<OutpostCardMessageBodyProps> = ({
  message,
  children,
}) => {
  const { updateMessage } = useOutpostState()
  const ro = useRO()
  return (
    <Collapse in={!message.collapsed} timeout="auto" unmountOnExit>
      {!ro && (
        <BtnGroup label="Render mode">
          {generateButtonsRender(message, updateMessage)}
        </BtnGroup>
      )}
      {!ro && (
        <BtnGroup label="Message type">
          {generateButtons(message, updateMessage)}
        </BtnGroup>
      )}

      {!ro && message.type === ContractMessageTypes.EXECUTE_MULTI && (
        <BtnGroup>{generateButtonsMulti(message, updateMessage)}</BtnGroup>
      )}
      {children}
    </Collapse>
  )
}

export default OutpostCardMessageBody

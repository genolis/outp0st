import { ContractMessage, ContractMessageRenderModes } from '@outpost/core';
import Form from './rendermodes/Form';
import JsonRender from './rendermodes/JsonRender';
import Schema from './rendermodes/Schema';

interface OutpostCardMessageRendererProps {
  message: ContractMessage;
  failMessage?: string | undefined;
  validateError?: string | undefined;
}

function OutpostCardMessageRenderer(props: OutpostCardMessageRendererProps) {
  switch (props.message.renderMode) {
    case ContractMessageRenderModes.JSON:
      return <JsonRender {...props} />;
    case ContractMessageRenderModes.FORM:
      return <Form {...props} />;
    case ContractMessageRenderModes.SCHEMA:
      return <Schema {...props} />;
    default:
      return <JsonRender {...props} />;
  }
}

export default OutpostCardMessageRenderer;

import { ContractMessage } from '@outpost/core';
import { EditorInput, FormItem } from 'components/form';
import { useOutpostState } from 'outpost/state/useOutpostState';
// import { parseJSON } from "utils/data"

interface JsonRenderProps {
  message: ContractMessage;
  failMessage?: string | undefined;
  validateError?: string | undefined;
}

// function addNumbersToJsonString(noNumbersJsonString: string) {
//   const parsed = parseJSON(noNumbersJsonString);

// }

function JsonRender({ message, failMessage, validateError }: JsonRenderProps) {
  const { updateMessage } = useOutpostState();
  let error: string = '';
  if (validateError) error = `JSON error: ${validateError}`;
  else if (failMessage) error = `Sumulation error: ${failMessage}`;
  return (
    <FormItem label="json msg" error={error}>
      <EditorInput
        value={message.message}
        onChange={e => {
          updateMessage({ ...message, message: e.target.value });
        }}
      />
    </FormItem>
  );
}

export default JsonRender;

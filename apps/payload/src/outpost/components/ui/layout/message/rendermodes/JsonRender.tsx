import { ContractMessage } from '@outp0st/core';
import { EditorInput, FormItem } from 'components/form';
import { useOutpostState } from 'outpost/state/useOutpostState';
// import { parseJSON } from "utils/data"

interface JsonRenderProps {
  message: ContractMessage;
  failMessage?: string | undefined;
  validateError?: string | undefined;
  placeholder?:string;
}

// function addNumbersToJsonString(noNumbersJsonString: string) {
//   const parsed = parseJSON(noNumbersJsonString);

// }

function JsonRender({ message, failMessage, validateError, placeholder }: JsonRenderProps) {
  const { updateMessage } = useOutpostState();
  let error: string = '';
  if (validateError) error = `JSON error: ${validateError}`;
  else if (failMessage) error = `Sumulation error: ${failMessage}`;
  return (
    <FormItem label="json msg" error={error}>
      <EditorInput
        value={message.message}
        placeholder={placeholder}
        onChange={e => {
          updateMessage({ ...message, message: e.target.value });
        }}
      />
    </FormItem>
  );
}

export default JsonRender;

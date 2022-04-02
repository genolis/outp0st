import { ContractMessage } from '@outp0st/core';
import { useOutpostState } from 'outpost/state/useOutpostState';
import MarkdownEditor from '../elements/MarkdownEditor';

interface OutpostMessageDocProps {
  message: ContractMessage;
}

export default function OutpostMessageDoc({ message }: OutpostMessageDocProps) {
  const { updateMessage } = useOutpostState();
  return (
    <div>
      <MarkdownEditor
        val={message.description}
        updateFn={(val: any) => {
          updateMessage({ ...message, description: val });
        }}
      />
    </div>
  );
}

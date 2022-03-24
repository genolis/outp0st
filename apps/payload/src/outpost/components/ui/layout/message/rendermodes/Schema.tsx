import { EditorInput, FormItem } from 'components/form';
import { ContractMessage } from 'outpost/state/model';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { validateMsg } from 'outpost/utils';

interface SchemaProps {
    message: ContractMessage;
}

function Schema({ message }: SchemaProps) {
    const { updateMessage } = useOutpostState();
    const validateError = validateMsg(message.schema || '{}');
    let error = '';
    if (validateError) error = `JSON error: ${validateError}`;
    return (
        <FormItem label='Schema' error={error}>
            <EditorInput
                value={message.schema}
                onChange={(e) => {
                    updateMessage({ ...message, schema: e.target.value });
                }}
            />
        </FormItem>
    );
}

export default Schema;

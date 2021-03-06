import { ContractMessage } from '@outp0st/core';
import Form from '@rjsf/core';
import { FormItem, Input } from 'components/form';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { toInput } from 'txs/utils';
import { parseJSON } from 'utils/data';

interface FormRenderProps {
  message: ContractMessage;
  failMessage?: string | undefined;
}

const CustomFieldNode = ({ formData, idSchema, onChange }: any) => {
  //console.log({ formData, idSchema, schema });
  const isAmount = (idSchema.$id as string).indexOf('amount') !== -1;
  return (
    <div>
      <FormItem>
        <Input
          value={isAmount ? toInput(formData) : formData}
          inputMode="decimal"
          onChange={e => {
            onChange(e.target.value + '000000');
          }}
        />
      </FormItem>
    </div>
  );
};

function FormRender({ message, failMessage }: FormRenderProps) {
  const { updateMessage } = useOutpostState();

  const customField = { StringField: CustomFieldNode };

  return (
    <div>
      <FormItem
        error={
          message.schema && failMessage && `Sumulation error: ${failMessage}`
        }
      >
        {message.schema && (
          <Form
            fields={customField}
            schema={parseJSON(message.schema) as any}
            formData={parseJSON(message.message || '')}
            onChange={e =>
              updateMessage({
                ...message,
                message: JSON.stringify(e.formData, null, 2),
              })
            }
          >
            <div>
              <button type="submit" style={{ display: 'none' }}>
                Submit
              </button>
            </div>
          </Form>
        )}
        {!message.schema && (
          <div>
            Please, provide schema for this message{' '}
            <a
              href="https://docs.cosmwasm.com/tutorials/simple-option/develop/#schema"
              rel="noreferrer"
              target="_blank"
            >
              learn more...
            </a>
          </div>
        )}
      </FormItem>
    </div>
  );
}

export default FormRender;

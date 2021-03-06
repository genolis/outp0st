import { ContractMessage } from '@outp0st/core';
import { Fetching } from 'components/feedback';
import { EditorInput, Form, FormItem, Submit } from 'components/form';
import { Pre } from 'components/general';
import { useQueryMessage } from 'outpost/hooks/useQueryMessage';

interface OutpostMessageQueryProps {
  message: ContractMessage;
}

export default function OutpostMessageQuery({
  message,
}: OutpostMessageQueryProps) {
  const {
    data,
    disabled,
    handleSubmit,
    state,
    submit,
    errorMessage,
    invalid,
    register,
  } = useQueryMessage(message);
  //console.log(data);
  return (
    <div>
      <Fetching {...state}>
        <Form onSubmit={handleSubmit(submit)}>
          <FormItem label="Input" error={invalid ? 'Invalid JSON' : undefined}>
            <EditorInput
              {...register('msg')}
              placeholder='{"token_info": {}}'
            />
          </FormItem>
          {(data || errorMessage) && (
            <>
              {/* <FormArrow /> */}

              <FormItem label={'Output'}>
                <Pre height={240} normal={!!errorMessage}>
                  {errorMessage ?? data}
                </Pre>
              </FormItem>
            </>
          )}
          <Submit disabled={disabled} submitting={state.isLoading} />
        </Form>
      </Fetching>
    </div>
  );
}

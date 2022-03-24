import { useBankBalance } from 'data/queries/bank';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { getInitialGasDenom } from 'txs/Tx';

export function useOutpostForm<T>(
  valueToWatch: any,
  storeFn?: (setValue: any) => {},
  defaultValues?: any,
  watchFn?: (value: any, val: any) => void
) {
  // form things
  const bankBalance = useBankBalance();

  /* tx context */
  const initialGasDenom = getInitialGasDenom(bankBalance);
  const defaultItem = defaultValues ? { denom: initialGasDenom } : null;
  const form = useForm<T>({
    mode: 'onChange',
    defaultValues: { ...defaultValues, coins: defaultItem }
  });
  const { watch, setValue, handleSubmit, register } = form;
  const values = watch();

  useEffect(() => {
    //console.log('value changed from value to watch');
    if (!storeFn) return;
    const store = async () => {
      if (storeFn) storeFn(setValue);
    };

    store();
    // eslint-disable-next-line
  }, [setValue, valueToWatch]);

  useEffect(() => {
    //console.log('watch changed');
    if (!watchFn) return;
    const subscription = watch((value, { name }) => watchFn(value, name));
    return () => subscription.unsubscribe();
  }, [watch, watchFn]);

  const estimationTxValues = useMemo(() => values, [values]);

  return { initialGasDenom, estimationTxValues, handleSubmit, register, defaultItem };
}

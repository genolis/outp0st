import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { isDenomTerraNative, readDenom } from '@terra.kitchen/utils';
import { FormGroup, FormItem, Input, Select } from 'components/form';
import { Button } from 'components/general';
import { useBankBalance } from 'data/queries/bank';
import { ContractMessage } from 'outpost/state/model';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { CoinInput, getPlaceholder } from 'txs/utils';
import { sortCoins } from 'utils/coin';

export interface OutpostMessageExecuteAmountProps {
  message: ContractMessage;
  initialGasDenom: any;
}

export default function OutpostMessageExecuteAmount({
  message,
  initialGasDenom,
}: OutpostMessageExecuteAmountProps) {
  const bankBalance = useBankBalance();
  const { updateMessage } = useOutpostState();
  if (!message.coins) return <span></span>;
  const coins = message.coins as CoinInput[];
  const defaultItem = { denom: initialGasDenom };
  return (
    <FormItem label={'Coins to send'}>
      <Button
        size="small"
        style={{ maxWidth: '20px', marginBottom: '20px' }}
        onClick={() => {
          updateMessage({
            ...message,
            coins: [...message.coins!, { ...defaultItem }],
          });
        }}
      >
        <AddIcon style={{ fontSize: 18 }} />
      </Button>
      {message.coins?.map(({ denom, input }, index) => (
        <FormGroup key={index}>
          <Input
            value={input}
            inputMode="decimal"
            onChange={e => {
              updateMessage({
                ...message,
                coins: [
                  ...coins.filter((_, idx) => idx !== index)!,
                  { denom, input: parseInt(e.target.value) },
                ],
              });
            }}
            placeholder={getPlaceholder()}
            selectBefore={
              <Select
                value={denom}
                onChange={e => {
                  updateMessage({
                    ...message,
                    coins: [
                      ...coins.filter((_, idx) => idx !== index)!,
                      {
                        denom: e.target.value,
                        input: input,
                      },
                    ],
                  });
                }}
                before
              >
                {sortCoins(bankBalance)
                  .filter(({ denom }) => isDenomTerraNative(denom))
                  .map(({ denom }) => (
                    <option value={denom} key={denom}>
                      {readDenom(denom)}
                    </option>
                  ))}
              </Select>
            }
          />
          <Button
            size="small"
            style={{ maxWidth: '20px', marginBottom: '5px' }}
            onClick={() => {
              updateMessage({
                ...message,
                coins: [...coins.filter((_, idx) => idx !== index)!],
              });
            }}
          >
            <RemoveIcon style={{ fontSize: 18 }} />
          </Button>
        </FormGroup>
      ))}
    </FormItem>
  );
}

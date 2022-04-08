import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Contract } from '@outp0st/core';
import { Form, FormItem, Input } from 'components/form';
import { Button } from 'components/general';
import { Card } from 'components/layout';
import ConfigTab from 'outpost/components/tabs/ConfigTab';
import { useOutpostState } from 'outpost/state/useOutpostState';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRO } from '../hooks/useRO';
import { ContractTabAddButton } from './tabs/ContractTabAddButton';
import OutpostMessageCardConstructor from './ui/layout/message/OutpostMessageCardConstructor';
import ContractTabStation from './ui/layout/OutpostCardContractBody';

export function OutpostTabs() {
  const { getContract, getContracts } = useOutpostState();
  const ro = useRO();
  const tabs =
    createTabs(
      getContracts().map(x => x.id),
      getContract,
    ) || [];
  const withConfig = tabs.concat([
    {
      key: 'CONFIG',
      tab: 'Config',
      children: <ConfigTab />,
    },
  ]);
  const withAdd = [
    {
      key: 'NEW',
      tab: '+',
      disabled: ro,
      children: GetNewTab(tabs),
    },
  ];
  const finalTabs = withConfig.concat(withAdd);
  return finalTabs;
}

function createTabs(
  contractIds: number[],
  getContract: (id: number) => Contract | undefined,
): any[] | undefined {
  if (!contractIds) return;
  let lastId: any;
  return contractIds.map(id => {
    const contract: Contract = getContract(id)!;
    if (lastId === id) return false;
    lastId = id;
    const messages = GetMessages(contract);
    return {
      key: contract.tabTitle.replaceAll(' ', '_'),
      tab: contract.tabTitle,
      children: (
        <div>
          <ContractTabStation {...contract} />
          {messages}
          <ContractTabAddButton contractId={contract.id} />
        </div>
      ),
    };
  });
}

function GetMessages(contract: Contract) {
  return contract.messages.map(id => {
    return (
      <OutpostMessageCardConstructor
        contractId={contract.id}
        messageId={id}
        key={id}
      />
    );
  });
}
function GetNewTab(tabs: { key: string; tab: string }[]) {
  const [state, setState] = useState({ tabTitle: '', title: '' });
  const [isWarningOpen, setWarningOpen] = useState(false);
  const navigate = useNavigate();
  const { addContract } = useOutpostState();

  const onCloseWarning = (_, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setWarningOpen(false);
  };

  const onAdd = () => {
    const isTabExist = !!tabs.find(i => i.tab === state.tabTitle);

    if (isTabExist) {
      setWarningOpen(true);
    } else {
      addContract({
        title: state.title,
        id: 0,
        tabTitle: state.tabTitle,
        messages: [],
      });
      navigate(
        { hash: state.tabTitle.replaceAll(' ', '_') },
        { replace: true },
      );
    }
  };

  return (
    <Card
      title="Create new tab"
      extra={
        <Button disabled={!state.title || !state.tabTitle} onClick={onAdd}>
          Create
        </Button>
      }
    >
      <Form>
        <FormItem label={`Contract title (Required)`}>
          <Input
            value={state.title}
            required
            onChange={e => {
              setState({ ...state, title: e.target.value });
            }}
            autoFocus
          />
        </FormItem>
        <FormItem label={`Tab title (Required)`}>
          <Input
            value={state.tabTitle}
            required
            onChange={e => {
              setState({ ...state, tabTitle: e.target.value });
            }}
          />
        </FormItem>
      </Form>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isWarningOpen}
        autoHideDuration={3000}
        onClose={onCloseWarning}
      >
        <MuiAlert onClose={onCloseWarning} severity="warning">
          Tab with the same name already exists!
        </MuiAlert>
      </Snackbar>
    </Card>
  );
}

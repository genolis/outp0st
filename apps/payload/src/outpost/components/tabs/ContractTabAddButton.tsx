import { Button } from 'components/general';
import { Grid } from 'components/layout';
import {
    ContractMessageRenderModes,
    ContractMessageTypes,
} from 'outpost/state/model';
import AddIcon from '@mui/icons-material/Add';
import { useOutpostState } from 'outpost/state/useOutpostState';

export function ContractTabAddButton(props: any) {
    const { addMessage } = useOutpostState();
    return (
        <div style={{ marginTop: '20px' }}>
            <Grid>
                <Button
                    onClick={() => {
                        addMessage({
                            contractId: props.contractId,
                            type: ContractMessageTypes.QUERY,
                            title: 'new query message',
                            collapsed: false,
                            renderMode: ContractMessageRenderModes.JSON,
                            id: 0,
                        });
                    }}>
                    <AddIcon style={{ fontSize: 18 }} />
                </Button>
            </Grid>
        </div>
    );
}

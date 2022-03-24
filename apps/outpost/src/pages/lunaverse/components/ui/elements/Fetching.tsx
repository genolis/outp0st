import { WithFetching, Wrong } from "components/feedback";
import { Card } from "components/layout";
import { FC } from "react";
import { getErrorMessage } from "utils/error";

interface Props extends QueryState {
  height?: number;
  showError?: boolean;
}

const Fetching: FC<Props> = ({ showError, children, ...state }) => {
  return (
    <WithFetching {...state}>
      {(progress, wrong) => (
        <>
          {progress}
          {wrong && showError ? (
            <Card>
              <Wrong>{getErrorMessage(state.error)}</Wrong>
            </Card>
          ) : (
            children
          )}
        </>
      )}
    </WithFetching>
  );
};

export default Fetching;

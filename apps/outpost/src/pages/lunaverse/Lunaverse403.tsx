// import { useNetworkName } from 'auth/hooks/useNetwork';
import { Page } from "components/layout";
import { Link } from "react-router-dom";
import { useOutpostState } from "./state/useOutpostState";

const Lunaverse = () => {
  const { outpostApp } = useOutpostState();
  const title = outpostApp("get", "title");

  // all initial setup should go here

  // const name = useNetworkName();
  // const isMainnet = name === "mainnet"

  return (
    <Page title={title ? title : "Outpost admin"}>
      <h1>
        Auth failed. Use test, test2, test3 acc to access ui (change wallet to
        this addresses, then hit F5)
      </h1>
      <Link to="/lunaverse">
        Click here to return to admin ui after changing wallet and refresh
      </Link>
    </Page>
  );
};

export default Lunaverse;

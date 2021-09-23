import { Route, Switch } from "react-router";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;

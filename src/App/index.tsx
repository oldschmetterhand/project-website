import { Route, Router, Switch } from "react-router";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Layout/Navbar";
import { NoMatch } from "./pages/NoMatch";
import { Person } from "./pages/Person";
import { Persons } from "./pages/Persons";
import { HISTORY } from "./constants";

export const App = () => {
  return (
    <Router history={HISTORY}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/persons" component={Persons} />
        <Route exact path="/person/:idLocal" component={Person} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
};

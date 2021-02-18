import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Discover from "./pages/Discover/Discover";
import Search from "./pages/Search/Search";
import Details from "./pages/Details/Details";
import Movies from "./pages/Movies/Movies";
import Tvs from "./pages/Tvs/Tvs";
import Persons from "./pages/Persons/Persons";
import Person from "./pages/Persons/Person";

function Routes() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Discover} />
          <Route exact path="/search/:query?" component={Search} />
          <Route exact path="/details/:type?/:id?" component={Details} />
          <Route exact path="/Movies" component={Movies} />
          <Route exact path="/Tvs" component={Tvs} />
          <Route exact path="/Persons" component={Persons} />
          <Route exact path="/Person/:id" component={Person} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;

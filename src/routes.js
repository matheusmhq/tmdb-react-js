import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Discover from "./pages/Discover/Discover";
import Search from "./pages/Search/Search";
import Details from "./pages/Details/Details";
import Movies from "./pages/Movies/Movies";
import Tvs from "./pages/Tvs/Tvs";

function Routes() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path="/search/:query?" component={Search} />
            <Route exact path="/details/:type?/:id?" component={Details} />
            <Route exact path="/Movies" component={Movies} />
            <Route exact path="/Tvs" component={Tvs} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default Routes;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Discover from "./pages/Discover/Discover";
import Search from "./pages/Search/Search";
import Details from "./pages/Details/Details";

function Routes() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path="/search/:query?" component={Search} />
            <Route exact path="/details/:type?/:id?" component={Details} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default Routes;

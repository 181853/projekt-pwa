import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home-page";
import { ROUTES } from "../constants";
import Layout from "./layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

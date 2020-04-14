import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home-page";
import { ROUTES } from "../constants";
import Layout from "./layout";
import Registration from "./registration";
import LogIn from "./login";
import NewPost from "./new-post";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.REGISTRATION} component={Registration} />
          <Route exact path={ROUTES.LOGIN} component={LogIn} />
          <Route exact path={ROUTES.POST_NEW} component={NewPost} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

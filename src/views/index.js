import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home-page";
import { ROUTES } from "../constants";
import Layout from "./layout";
import NewPost from "./new-post";
import AuthForm from "../components/auth-form";

const LogIn = () => <AuthForm isLoginForm />;
const Registration = () => <AuthForm />;

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

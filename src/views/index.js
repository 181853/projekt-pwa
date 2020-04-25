import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./home-page";
import { ROUTES } from "../constants";
import Layout from "./layout";
import NewPost from "./new-post";
import AuthForm from "../components/auth-form";
import SinglePost from "./single-post";

const LogIn = () => <AuthForm isLoginForm />;
const Registration = () => <AuthForm />;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to={ROUTES.HOME} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.REGISTRATION} component={Registration} />
          <Route path={ROUTES.LOGIN} component={LogIn} />
          <Route path={ROUTES.POST_NEW} component={NewPost} />
          <Route path={ROUTES.POST + "/:postId"} component={SinglePost} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

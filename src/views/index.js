import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home-page";
import { ROUTES } from "../constants";
import Layout from "./layout";
import NewPost from "./new-post";
import AuthForm from "../components/auth-form";
import SinglePost from "./single-post";
import SplashScreen from "./splash-screen";

const LogIn = () => <AuthForm isLoginForm />;
const Registration = () => <AuthForm />;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.ROOT} component={SplashScreen} />
          <Route path={ROUTES.HOME} component={HomePage} />
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

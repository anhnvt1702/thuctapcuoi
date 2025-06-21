import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { registerNav } from "../modules/Navigation";
import { createBrowserHistory } from "history";
import PageNotFound from "../views/PageNotFound";
import HomeRoutes from "./HomeRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "../modules/Auth";
import LoadMemory from "utils/memory";
import AdminRoutes from "Admin/AdminRoutes";


const PrivateRouter = ({ component, ...options }) => {
  const finalComponent =
    Auth.getUserDetails() !== undefined &&
    Auth.getUserDetails() !== null &&
    Auth.getToken() !== undefined ? (
      <Route {...options} component={component} />
    ) : (
      <Redirect to="/PageNotFound" />
    );

  return finalComponent;
};

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const browserHistory = createBrowserHistory();

    return (
      <div>
        <Router ref={registerNav}>
          <Switch>
            {/* Home (public) routes */}
            {HomeRoutes.map((homeRoute, index) => (
              <Route
                key={index}
                path={homeRoute.path}
                exact={homeRoute.exact}
                component={(props) => (
                  <homeRoute.layout {...props}>
                    <homeRoute.component {...props} />
                  </homeRoute.layout>
                )}
              />
            ))}

            {/* Private user routes */}
            {PrivateRoutes.map((privateRoute, index) => (
              <PrivateRouter
                key={index}
                path={privateRoute.path}
                exact={privateRoute.exact}
                component={(props) => (
                  <privateRoute.layout {...props}>
                    <privateRoute.component {...props} />
                  </privateRoute.layout>
                )}
              />
            ))}

            {/* Admin routes - no shared layout */}
            {AdminRoutes.map((adminRoute, index) => (
              <PrivateRouter
                key={index}
                path={adminRoute.path}
                exact={adminRoute.exact}
                component={(props) => (
                  <adminRoute.layout {...props}>
                    <adminRoute.component {...props} />
                  </adminRoute.layout>
                )}
              />
            ))}

            {/* Fallback 404 */}
            <Route component={PageNotFound} />
          </Switch>
        </Router>

        <LoadMemory></LoadMemory>
      </div>
    );
  }
}

export default Routes;

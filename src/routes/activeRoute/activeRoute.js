import React from "react";
import { Route } from "react-router-dom";

import imageUpload from "app/imageUpload";

import ActiveContainer from "./activeContainer";

// Application Routes
const routes = [
  { path: "/", component: imageUpload },
];

const activeRoutes = routes.map(route => {
  const { path, component: Component } = route;
  return (
    <Route
      exact
      path={path}
      key={path}
      render={routeProps => <ActiveContainer component={Component} {...routeProps} />}
    />
  );
});

export default activeRoutes;

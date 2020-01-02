import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import Home from "../pages/Home";
import About from "../pages/About";


const Router = () => {
  return (
    <Switch>
      <Redirect exact strict from = "/" to = "/home" />
      <Route 
        path = "/home"
        component = { Home } />
      <Route 
        path = "/about"
        component = { About } 
      />
  </Switch>
  );
};

export default hot(Router);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './stores';
import Router from './router';

render(
  <Provider store={store}>
    <ConnectedRouter history = {history}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
  ,document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
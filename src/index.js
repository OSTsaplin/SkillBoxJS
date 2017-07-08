import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from "./containers/app";
import { connectToUnsplash } from "./unit/sys-proc";

connectToUnsplash();

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <App store={store} />,
  document.querySelector("#root")
);

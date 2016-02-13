/*eslint-env node*/
"use strict";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import './css/styles.scss';

const isProduction = process.env.NODE_ENV === "production";

ReactDOM.render(
  <App />,
  document.getElementById("app")
);

require("./ga")(isProduction);

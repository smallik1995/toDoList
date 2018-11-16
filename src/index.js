import React from "react";
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App.jsx';

import 'bootswatch/dist/lumen/bootstrap.min.css';
import "./App.css";


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();

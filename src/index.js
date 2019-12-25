import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import * as serviceWorker from './serviceWorker';

import store from './redux/store';
import Routes from './pages/routes'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const skeleton = (
  <Fragment>
    <Routes />
    <ToastContainer />
  </Fragment>
)

ReactDOM.render(
  <Provider store={store} >
    {skeleton}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

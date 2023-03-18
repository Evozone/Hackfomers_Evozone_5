import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

import React from 'react';
import ReactDOM from 'react-dom';
// 'BrowserRouter' provides routing functionality
import { BrowserRouter } from 'react-router-dom';
// Will give to the application an access to the Store and Reducers.
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
// Will allow to access 'store' to the rest of the application
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

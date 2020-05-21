import React from 'react';
import ReactDOM from 'react-dom';
// 'BrowserRouter' provides routing functionality
import { BrowserRouter } from 'react-router-dom';
// Will give to the application an access to the Store and Reducers.
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
// Will allow to access 'store' to the rest of the application. 'persistor' is a persisted version of a 'store'
import { store, persistor } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Array of middlewares
const middlewares = [logger];

/*
Creates a store (will pass it to the Provider in index.js, it will allow to access 'store' to the rest of the application).
Takes-in a rootReducer and return value of applyMiddleware. Inside of applyMiddleware() will spread middlewares array.
*/

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

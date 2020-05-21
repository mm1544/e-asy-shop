import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
/*
To allow browser to cash a 'store' (using redux-persist module), depending on certain configurations
*/
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

// Array of middlewares
const middlewares = [logger];

/*
Creates a store (will pass it to the Provider in index.js, it will allow to access 'store' to the rest of the application).
Takes-in a rootReducer and return value of applyMiddleware. Inside of applyMiddleware() will spread middlewares array.
*/

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };

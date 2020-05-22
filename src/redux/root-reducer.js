import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// Importing a type of storage that it is needed. LocalStorage in this case (sessionStorage could be used instead).
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// JSON obj. that represents possible configurations for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // List of names of reducers that we want to store
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// Exporting a modified version of a rootReducer with a persistConfig
export default persistReducer(persistConfig, rootReducer);

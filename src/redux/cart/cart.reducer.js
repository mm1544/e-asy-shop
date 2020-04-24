import CartActionTypes from './cart.types';
import { addItemsToCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const { TOGGLE_CART_HIDDEN, ADD_ITEM } = CartActionTypes;

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      // Returns a new 'state' where an old 'state' is spread and 'hidden' is added/updated
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ADD_ITEM:
      return {
        ...state,
        // Item to be added is from 'action.payload'
        cartItems: addItemsToCart(state.cartItems, action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;

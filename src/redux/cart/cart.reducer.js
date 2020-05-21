import CartActionTypes from './cart.types';
import { addItemsToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
} = CartActionTypes;

// Allways returning a new obj.
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

    case REMOVE_ITEM:
      return {
        ...state,
        // Array with decreased number of items, or the removed item from the cart
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        // 'cartItems' arr will be without the item that we want to remove
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;

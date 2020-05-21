import CartActionTypes from './cart.types';

const {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
} = CartActionTypes;

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
  // 'payload' is an optional property in action obj.
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  // 'item' that we are intended remove
  payload: item,
});

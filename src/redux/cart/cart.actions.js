import CartActionTypes from './cart.types';

const { TOGGLE_CART_HIDDEN, ADD_ITEM } = CartActionTypes;

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
  // 'payload' is an optional property in action obj.
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

import CartActionTypes from './cart.types';

const { TOGGLE_CART_HIDDEN } = CartActionTypes;

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
  // 'payload' is an optional property in action obj.
});

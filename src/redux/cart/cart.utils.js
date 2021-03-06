// Any utility functions related to 'cart'

/*
cartItems - existing items in the cart
cartItemToAdd - a new item to add
*/
export const addItemsToCart = (cartItems, cartItemToAdd) => {
  /*
  Will return a first item based on a condition. If such item is found, it will be set to 'existingCartItem'. If such item does not exist, then 'existingCartItem' will be undefined.
  */
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    // arr.map() returns a new array...
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // If there is no such item in cartItems
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If the quantity of existing item is 1, then removes it from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // If quantity is more than 1, it will be decreased
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

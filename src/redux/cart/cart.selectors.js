import { createSelector } from 'reselect';

/*
    // Eventhough will use only 'cartItems' from the state, 'mapStateToProps' will be called each time when the state will be accessed (from any other component).

     It is called 'selector'. Will need memoisation (cashing of selector's valuses) to not rerender this particular object if the value of 'cartItems' in the state will not be changed. Can achieve memoisation by using library 'reselect'. 'reselect' allows to write selectors in such a way, so that if the properties that we are pulling from the state ('cartItems') has the same value, it will not pass them into our component (it will pass the old value) and React component will not re-render(!!!).
     
     reduce() is a native array method in JS
    */

/*
There are 2 types of selectore: Input Selector (doesn't use 'createSelector') and Output Selector (use Input Selector and 'createSelector' to build themselves).
*/

// Input Selector. Takes the whole state and returns just a 'slice' of it.
const selectCart = (state) => state.cart;

/*
Output Selector. Takes in array of Input Selectors, and a function that will return desired value aut of this selector (this fn. takes as parameter an output of Input Selector)...

// Because we use 'createSelector' to make this 'selectCartItems' selector, it is a memoized(!!!)selector.
*/
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// In this case it takes-in another Output Selector. It will give a total quantity of all items.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

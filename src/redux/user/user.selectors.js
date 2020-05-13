import { createSelector } from 'reselect';

// Input-selector
const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  // Array of input-selectors
  [selectUser],
  // Passed-in the return of input-selector
  (user) => user.currentUser
);

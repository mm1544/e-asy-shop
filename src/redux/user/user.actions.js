import { UserActionTypes } from './user.types';

const { SET_CURRENT_USER } = UserActionTypes;
/*
Setting Current User.
Takes-in a user obj. (either userAuth or user snapshot obj. or it is null)
*/
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

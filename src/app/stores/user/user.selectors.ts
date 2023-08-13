import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// This selector retrieves the entire UserState from the global state
export const selectUserState = (state: { user: UserState }) => state.user;

// This selector extracts the user data from the UserState
export const selectUserData = createSelector(
  selectUserState,
  state => state.user
);

// This selector combines the user data with any options you might have
export const selectUserDataAndOptions = createSelector(
  selectUserData,
  user => ({ user }) // You can add additional properties here if needed
);

// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from 'src/app/core/models/interface';

export interface UserState {
  user: User | null;
  options: any;
}

export const initialState: UserState = {
  user: null,
  options: {},
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserDataSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(UserActions.updateOptions, (state, { user }) => ({
    ...state,
    user,
  })),
  on(UserActions.removeUserData, (state) => ({ ...state, user: null }))
);

import { createReducer, on } from '@ngrx/store';
import { updateLoading } from './loading.actions';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingReducer = createReducer(
  initialState,
  on(updateLoading, (state, { isLoading }) => ({ ...state, isLoading }))
);

import { createAction, props } from '@ngrx/store';

export const updateLoading = createAction(
  '[Loading] Update Loading',
  props<{ isLoading: boolean }>()
);

/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
export interface tokenStateType {
  isLoading: boolean;
  error: null | Error;
  value: null | string;
}

// Define the initial state using that type
const initialState: tokenStateType = {
  isLoading: true,
  error: null,
  value: null,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string>) =>
      (state = {
        ...state,
        value: action.payload,
      }),
  },
});

export const { changeToken } = tokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.token;

const tokenState = tokenSlice.reducer;

export default tokenState;

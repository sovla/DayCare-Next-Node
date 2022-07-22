/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
export interface errorStateType {
  errorStatus: any;
  isShow: boolean;
}

// Define the initial state using that type
const initialState: errorStateType = {
  errorStatus: null,
  isShow: false,
};

export const errorSlice = createSlice({
  name: 'error',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeError: (state, action: PayloadAction<errorStateType>) =>
      (state = {
        ...state,
        errorStatus: action.payload.errorStatus,
        isShow: action.payload.isShow,
      }),
  },
});

export const { changeError } = errorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectError = (state: RootState) => state.error;

const errorState = errorSlice.reducer;

export default errorState;

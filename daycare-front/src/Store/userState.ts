/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface user {
  id: number;
  email: string;
  name: string;
}
// Define a type for the slice state
export interface userStateType {
  isLoading: boolean;
  error: null;
  auth: null | user;
}

// Define the initial state using that type
const initialState: userStateType = {
  isLoading: true,
  error: null,
  auth: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<user>) =>
      (state = {
        ...state,
        auth: action.payload,
      }),
  },
});

export const { changeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

const userState = userSlice.reducer;

export default userState;

const mockInitialState: userStateType = {
  isLoading: true,
  error: null,
  auth: {
    id: 1,
    name: '테스트',
    email: '테스트@naver.com',
  },
};
const mockUserSlice = createSlice({
  name: 'user',
  initialState: mockInitialState,
  reducers: {
    changeUser: (state, action: PayloadAction<user>) =>
      (state = {
        ...state,
        auth: action.payload,
      }),
  },
});

export const mockUserState = mockUserSlice.reducer;

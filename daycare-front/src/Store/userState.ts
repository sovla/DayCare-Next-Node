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
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<user>) =>
      (state = {
        ...state,
        auth: action.payload,
      }),
    // changeOptionalUser: (state, action: PayloadAction<Partial<userState>>) => {
    //     return (state = {
    //         ...state,
    //         ...action.payload,
    //     });
    // },
    // changeProfileImage: (state, action: PayloadAction<userState['mt_profile']>) => {
    //     return (state = {
    //         ...state,
    //         mt_profile: action.payload,
    //     });
    // },
    // changeTell: (state, action: PayloadAction<Pick<userState, 'mt_hp' | 'mt_country'>>) => {
    //     return (state = {
    //         ...state,
    //         mt_hp: action.payload.mt_hp,
    //         mt_country: action.payload.mt_country,
    //     });
    // },
    // clearUser: state => {
    //     return (state = initialState);
    // },
  },
});

export const { changeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

const userState = userSlice.reducer;

export default userState;

import { AxiosResponse } from 'axios';
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '@src/API';
import { getAlarmType, alarmType } from '@src/Type/API/alarm';
import type { RootState } from './store';

export interface fcmAlarm {
  collapseKey: string;
  from: string;
  messageId: string;
  data: {
    id: string;
    review_id: string;
    center_id: string;
    center_lat: string;
    center_lon: string;
  };
  notification: {
    body: string;
    title: string;
  };
}
// Define a type for the slice state
export interface alarmStateType {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | Error;
  fcmAlarmList: fcmAlarm[];
  apiAlarmList: alarmType[];
}

// Define the initial state using that type
const initialState: alarmStateType = {
  loading: 'idle',
  error: null,
  fcmAlarmList: [],
  apiAlarmList: [],
};

export const fetchAlarmByUserId = createAsyncThunk(
  'alarm/fetchAlarmByUserId',
  async (userId: number, thunkAPI) => {
    // createAsyncThunk 로
    if (!userId || typeof userId !== 'number') {
      console.log('no user');
      return [];
    }
    const response = await API.get<
      any,
      AxiosResponse<getAlarmType['response'], getAlarmType['request']>
    >('/alarm', {
      params: {
        id: userId,
      },
    });
    return response.data.alarm;
  }
);

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    addFcmAlarm: (state, action: PayloadAction<fcmAlarm>) =>
      (state = {
        ...state,
        fcmAlarmList: [...state.fcmAlarmList, action.payload],
      }),
    deleteFcmAlarm: (state, action: PayloadAction<fcmAlarm>) =>
      (state = {
        ...state,
        fcmAlarmList: state.fcmAlarmList.filter(
          (v) => v.messageId !== action.payload.messageId
        ),
      }),
    initAlarm: (state, action) =>
      (state = {
        ...state,
        fcmAlarmList: [],
        apiAlarmList: [],
        loading: 'idle',
        error: null,
      }),
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAlarmByUserId.pending, (state, action) => {
      // Add user to the state array
      state.loading = 'pending';
    });
    builder.addCase(fetchAlarmByUserId.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = 'succeeded';
      state.apiAlarmList = action.payload;
    });
  },
});

export const { addFcmAlarm, deleteFcmAlarm, initAlarm } = alarmSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlarm = (state: RootState) => state.alarm;

const alarmState = alarmSlice.reducer;

export default alarmState;

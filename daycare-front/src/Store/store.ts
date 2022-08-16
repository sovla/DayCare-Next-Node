import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import alarmState from './alarmState';
import errorState from './errorState';
import tokenState from './tokenState';
import userState, { mockUserState } from './userState';

export const makeStore = configureStore({
  reducer: {
    // the convention is to name this photos rather
    // than photosStore but photosStore is clearer to me.
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
    user: userState,
    error: errorState,
    token: tokenState,
    alarm: alarmState,
  },
  devTools: true,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['error/changeError'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'error',
          'error.payload.errorStatus',
          'error.errorStatus',
        ],
        // Ignore these paths in the state
        ignoredPaths: ['error.payload.errorStatus'],
      },
    }),
});

export const mockStore = configureStore({
  reducer: {
    // the convention is to name this photos rather
    // than photosStore but photosStore is clearer to me.
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
    user: mockUserState,
    error: errorState,
  },
  devTools: true,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['error/changeError'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'error',
          'error.payload.errorStatus',
          'error.errorStatus',
        ],
        // Ignore these paths in the state
        ignoredPaths: ['error.payload.errorStatus'],
      },
    }),
});

const wrapper = createWrapper(() => makeStore);

export default wrapper;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof makeStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

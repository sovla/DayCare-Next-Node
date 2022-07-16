import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userState from './userState';

const makeStore = configureStore({
  reducer: {
    // the convention is to name this photos rather
    // than photosStore but photosStore is clearer to me.
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
    user: userState,
  },
  devTools: true,
});

const wrapper = createWrapper(() => makeStore);

export default wrapper;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof makeStore.dispatch;

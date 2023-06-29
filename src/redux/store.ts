// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";

import searchReducer from './redux/search';

export const store = configureStore({
  reducer: {
    search: searchReducer
  }
});
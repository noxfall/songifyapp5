import { configureStore } from "@reduxjs/toolkit";

import searchReducer from './redux/search';
import gifReducer from './redux/gif';
import lyricsReducer from './redux/lyrics'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    gif: gifReducer,
    lyrics: lyricsReducer
  }
});
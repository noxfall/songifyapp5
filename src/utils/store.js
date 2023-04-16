import { configureStore } from "@reduxjs/toolkit";

import searchReducer from './redux/search';
import gifReducer from './redux/gif';
import lyricsReducer from './redux/lyrics';
import songReducer from './redux/song';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    gif: gifReducer,
    lyrics: lyricsReducer,
    song: songReducer
  }
});
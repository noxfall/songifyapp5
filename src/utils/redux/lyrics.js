import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://api.musixmatch.com/ws/1.1/';
const apiKey = import.meta.env.VITE_MM_API;

const initialState = {
  lyricsID: [],
  lyrics: []
};

export const fetchLyricsID = createAsyncThunk(
  'lyrics/fetchLyricsID',
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}track.search?q=${query}&page_size=100&apikey=${apiKey}`);
      const data = await res.json();
      for (let i in data.message.body.track_list) {
        if (data.message.body.track_list[i].track.has_lyrics === 1) {
          return data.message.body.track_list[i].track.commontrack_id;
        }
      }
    } catch (err) {
      callback.rejectWithValue({ error: err.message });
    }
  }
);

export const fetchLyrics = createAsyncThunk(
  'lyrics/fetchLyrics',
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}track.lyrics.get&commontrack_id=${query}&apikey=${apiKey}`);
      const data = await res.json();
      return data.message.body.lyrics;
    } catch (err) {
      callback.rejectWithValue({ error: err.message });
    }
  }
);

const lyrics = createSlice({
  name: 'lyrics',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLyricsID.fulfilled, (state, action) => {
      state.lyricsID = action.payload;
    })
    builder.addCase(fetchLyrics.fulfilled, (state, action) => {
      state.lyrics = action.payload;
    })
  }
});

export default lyrics.reducer;
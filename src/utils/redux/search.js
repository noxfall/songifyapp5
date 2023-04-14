import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://ws.audioscrobbler.com/2.0/';
const apiKey = import.meta.env.VITE_LASTFM_API;

const initialState = {
  results: []
};

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}?method=track.search&track=${query}&api_key=${apiKey}&format=json`);
      const data = await res.json();
      return data.results.trackmatches;
    } catch (err) {
      callback.rejectWithValue({ error: err.message })
    }
  }
);

const search = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.results = action.payload;
    })
  }
});

export default search.reducer;
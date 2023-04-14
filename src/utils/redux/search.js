import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://ws.audioscrobbler.com/2.0/';
const apiKey = import.meta.env.VITE_LASTFM_API;

const initialState = {
  results: [],
  selected: {}
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

export const fetchSelected = createAsyncThunk(
  'search/fetchSelected',
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}?method=track.search&track=${query}&api_key=${apiKey}&format=json`);
      const data = await res.json();
      return data.results.trackmatches.track[query];
    } catch (err) {
      callback.rejectWithValue({ error: err.message })
    }
  }
);

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    select: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.results = action.payload;
    })
    builder.addCase(fetchSelected.fulfilled, (state, action) => {
      state.selected = action.payload;
    })
  },
});

export const { select } = search.actions;

export default search.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://soundcloud-scraper.p.rapidapi.com/v1/search/tracks';
const apiKey = import.meta.env.VITE_SC_RAPIDAPI;

const initialState = {
  song: []
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
  }
};

export const fetchSong = createAsyncThunk(
  'song/fetchSong',
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}?term=${query}`, options);
      const data = await res.json();
      console.log(data.tracks.items[0].permalink);
      return data.tracks.items[0].permalink;
    } catch (err) {
      callback.rejectWithValue({ error: err.message });
    }
  }
);

const song = createSlice({
  name: "song",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      state.song = action.payload;
    })
  }
});

export default song.reducer;
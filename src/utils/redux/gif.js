import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://api.giphy.com/v1';
const apiKey = import.meta.env.VITE_GIPHY_API;

const initialState = {
  gifs: []
};

export const fetchGifs = createAsyncThunk(
  "gif/fetchGifs",
  async (query, callback) => {
    try {
      const res = await fetch(`${baseUrl}/gifs/search?api_key=${apiKey}&q=${query}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      callback.rejectWithValue({ error: err.message });
    }
  }
);

const gif = createSlice({
  name: "gif",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGifs.fulfilled, (state, action) => {
      state.gifs = action.payload;
    })
  }
});

export default gif.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: []
};

const favorite = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFav: (state, action) => {
      const isFav = state.favorites.find((i) => i.name === action.payload.name);
      !isFav && state.favorites.push(action.payload);
    },
    delFav: (state, action) => {
      state.favorites = state.favorites.filter((i) => i.name !== action.payload.name);
    }
  }
});

export const { addFav, delFav } = favorite.actions;

export default favorite.reducer;
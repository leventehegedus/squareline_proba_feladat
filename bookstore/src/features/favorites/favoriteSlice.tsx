import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  isbn13: string;
  title: string;
}

const initialState: Book[] = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    updateFavorite: (state, action: PayloadAction<Book>) => {
      const existingIndex = state.findIndex(
        (favorite) => favorite.isbn13 === action.payload.isbn13
      );
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { updateFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

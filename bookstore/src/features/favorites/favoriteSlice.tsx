import { IBook } from "@/types/book";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadFavoritesFromStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToStorage = (favorites: IBook[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const initialState: IBook[] = loadFavoritesFromStorage();

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    updateFavorite: (state, action: PayloadAction<IBook>) => {
      const existingIndex = state.findIndex(
        (favorite) => favorite.isbn13 === action.payload.isbn13
      );
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } else {
        state.push(action.payload);
      }
      saveFavoritesToStorage(state);
    },
  },
});

export const { updateFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

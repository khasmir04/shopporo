import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishList: (state, action) => {
      const productIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex < 0) state.wishlistItems.push(action.payload);
    },

    removeFromWishList: (state, action) => {
      const productIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload
      );

      if (productIndex >= 0) state.wishlistItems.splice(productIndex, 1);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;

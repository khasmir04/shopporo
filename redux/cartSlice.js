import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex < 0) {
        state.cartItems.push({ ...action.payload, qty: 1 });
      } else {
        state.cartItems[productIndex].qty++;
      }
    },

    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (index >= 0) state.cartItems.splice(index, 1);
    },

    decreaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (index >= 0) {
        state.cartItems[index].qty--;
      }
    },

    increaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (index >= 0) {
        state.cartItems[index].qty++;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

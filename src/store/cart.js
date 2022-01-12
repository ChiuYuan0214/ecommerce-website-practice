import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  addItem: (state, action) => {
    const updatedItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );
    if (updatedItemIndex >= 0) {
      state.cartItems[updatedItemIndex].amount += action.payload.amount;
    } else {
      state = [...state, action.payload];
    }
  },
  removeItem: (state, action) => {
    const updatedItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload
    );
    if (updatedItemIndex) {
      state.cartItems[updatedItemIndex].amount--;
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // {id, amount }
  cartIsOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => { // action.payload = {id, amount}
      const updatedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updatedItemIndex >= 0) {
        state.cartItems[updatedItemIndex].amount += action.payload.amount;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeItem: (state, action) => { // action.payload = id
      const updatedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      const updatedAmount = state.cartItems[updatedItemIndex].amount - 1;
      if (updatedItemIndex >= 0) {
        if (updatedAmount === 0) {
          state.cartItems.splice(updatedItemIndex, 1);
        } else {
          state.cartItems[updatedItemIndex].amount--;
        }
      }
    },
    toggleCart: (state) => {
      state.cartIsOpen = !state.cartIsOpen;
    },
    reset: (state) => {
      state.cartItems = [];
      state.cartIsOpen = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

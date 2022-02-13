import { createSlice } from "@reduxjs/toolkit";

import {DUMMY_PRODUCTS} from '../data/products';

const initialState = {
  items: DUMMY_PRODUCTS,
  history: [],
  productModalId: null,
  categories: ["book", "food", "dress"],
};

const prodSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setIsFav: (state, action) => {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const updatedItem = state.items[updatedItemIndex];
      state.items[updatedItemIndex].isFav = !updatedItem.isFav;
    },
    addHistory: (state, action) => {
      state.history = [action.payload, ...state.history];
    },
    showProduct: (state, action) => {
      state.productModalId = action.payload;
    }
  },
});

export const prodActions = prodSlice.actions;
export default prodSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import jeansImg from '../images/Jeans.png';
import algorithmImg from '../images/Algorithm.png';
import tShirtImg from '../images/T-shirt.png';
import javaScriptImg from '../images/JavaScript.png';
import instantNoodlesImg from '../images/Instant-Noodles.png';
import proteinImg from '../images/Protein.png';

const initialState = {
  items: [
    {
      id: "1",
      title: "Basic Algorithm",
      description: "An introduction to algorithm.",
      imageUrl: algorithmImg,
      price: 1600,
      category: "book",
      discount: null,
      isFav: false,
    },
    {
      id: "2",
      title: "T-Shirt",
      description: "A plain white T-shirt.",
      imageUrl: tShirtImg,
      price: 500,
      category: "dress",
      discount: null,
      isFav: false,
    },
    {
      id: "3",
      title: "Jeans",
      description:
        "Discover our extensive collection of women's jeans on sale.",
      imageUrl: jeansImg,
      price: 3300,
      category: "dress",
      discount: 0.85,
      isFav: false,
    },
    {
      id: "4",
      title: "Basic JavaScript",
      description: "Tutorial for becoming a web developer.",
      imageUrl: javaScriptImg,
      price: 1200,
      category: "book",
      discount: null,
      isFav: false,
    },
    {
      id: "5",
      title: "Instant Noodles",
      description: "The Best Instant Noodles To Satisfy Your Ramen Cravings",
      imageUrl: instantNoodlesImg,
      price: 20,
      category: "food",
      discount: null,
      isFav: false,
    },
    {
      id: "6",
      title: "Proteins",
      description:
        " certified manufacturing facilities only use high quality ingredients",
      imageUrl: proteinImg,
      price: 1250,
      category: "food",
      discount: 0.95,
      isFav: false,
    },
  ],
  history: [],
  productModalId: null,
  categories: ['book', 'food', 'dress'],
};

const prodSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setIsFav: (state, action) => {
      console.log('setting!');
      const updatedItems = state.items;
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
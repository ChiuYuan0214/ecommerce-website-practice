import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authData: {
    profile: {
      name: "Rick",
      email: "12345678@gmail.com",
      phone: "0922000123",
      birth: "2000-12-25",
    },
    buyingHistory: [], // {date: string, totalPrice: string, items: {prodId, amount, discount}[]}
    favoriteList: [], // prodId
    browsingHistory: [], // { id, date }
  },
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.authData = {
          profile: {
            name: "",
            email: "",
            phone: "",
            birth: "",
          },
          buyingHistory: [],
          favoriteList: [],
          browsingHistory: [],
        };
    },
    setProfile: (state, action) => {
      if (action.payload.target === "all") {
        state.authData.profile = action.payload.data;
        return;
      }
      state.authData.profile[action.payload.target] = action.payload.data;
    },
    addBuyingHistory: (state, action) => {
      const items = action.payload;
      const date = new Date();
      const id = date.getTime().toString();
      const totalPrice = items.reduce((sum, item) => {
        let price = item.price * item.amount;
        if (item.discount) {
          price *= item.discount;
        }
        return sum + price;
      }, 0);
      const newHistory = { id, totalPrice, items: action.payload };
      state.authData.buyingHistory.unshift(newHistory);
    },
    setBuyingHistory: (state, action) => {
      state.authData.buyingHistory = action.payload;
    },
    toggleFavorite: (state, action) => {
      const targetIndex = state.authData.favoriteList.findIndex(
        (id) => id === action.payload
      );
      if (targetIndex >= 0) {
        state.authData.favoriteList.splice(targetIndex, 1);
      } else {
        state.authData.favoriteList.unshift(action.payload);
      }
    },
    setFavorite: (state, action) => {
      let localList = state.authData.favoriteList;
      if (localList.length > 0) {
        localList = localList.filter((id) => !action.payload.includes(id));
      }
      state.authData.favoriteList = [...localList, action.payload];
    },
    addBrowsingHistory: (state, action) => {
      const date = new Date();
      const historyId = date.getTime();
      const newHistory = { id: action.payload, historyId };
      const targetIndex = state.authData.browsingHistory.findIndex(
        (his) => his.id === action.payload
      );
      if (targetIndex >= 0) {
        state.authData.browsingHistory.splice(targetIndex, 1);
      }
      state.authData.browsingHistory.unshift(newHistory);
    },
    setBrowsingHistory: (state, action) => {
      state.authData.browsingHistory = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

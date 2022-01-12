import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import prodReducer from './products';
import cartReducer from './cart';

const store = configureStore({
    reducer: {
        auth: authReducer,
        prod: prodReducer,
        cart: cartReducer,
    }
});

export default store;
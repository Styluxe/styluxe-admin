import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import productReducer from './product/productSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        product: productReducer
    }

})
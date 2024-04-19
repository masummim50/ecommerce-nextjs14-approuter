import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { productType } from "@/app/interfaces/productInterface";

// Define a type for the slice state
export interface cartItemType extends productType {
  quantity: number | 1;
}

type productState = {
  products: cartItemType[];
};

// Define the initial state using that type
const initialState: productState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProduct: (state, action) => {
      console.log("payload from setuser authslice reducer: ", action.payload);
      state.products = action.payload;
      state.products.forEach((product) => {
        if (!product.quantity) {
          product.quantity = 1;
        }
      });
      return state;
    },
    increaseQuantity: (state, action) => {
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          product.quantity++;
        }
      });
      return state;
    },
    decreaseQuantity: (state, action) => {
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          product.quantity--;
        }
      });
      return state;
    },
  },
});

export const { setProduct, increaseQuantity, decreaseQuantity } =
  productSlice.actions;

export default productSlice.reducer;

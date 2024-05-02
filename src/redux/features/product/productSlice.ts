import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { productType } from "@/app/interfaces/productInterface";

// Define a type for the slice state
export interface cartItemType extends productType {
  quantity: number | 1;
}

// type productState = {
//   products: cartItemType[];
// };
type productState = {
  [key: string]: cartItemType[];
};

// Define the initial state using that type
const initialState: productState = {};

export const productSlice = createSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProduct: (state, action) => {
      console.log(
        "payload from setproducts productslice reducer: ",
        action.payload
      );
      const newState = action.payload.reduce((prev: any, curr: any) => {
        if (prev[curr.storeId]) {
          prev[curr.storeId].push({ ...curr });
        } else {
          prev[curr.storeId] = [{ ...curr }];
        }
        return prev;
      }, {});
      // state.products = action.payload;
      // state.products.forEach((product) => {
      //   if (!product.quantity) {
      //     product.quantity = 1;
      //   }
      // });
      console.log("new state after reduce function: ", newState);
      return newState;
    },
    increaseQuantity: (state, action) => {
      state[action.payload.storeId].forEach((product) => {
        if (product.id === action.payload.productId) {
          product.quantity++;
        }
      });
      return state;
    },
    decreaseQuantity: (state, action) => {
      state[action.payload.storeId].forEach((product) => {
        if (product.id === action.payload.productId) {
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

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { productType } from "@/app/interfaces/productInterface";

type toastType = {
  id: number;
  text: string;
};

const initialState: toastType[] = [];

export const toastSlice = createSlice({
  name: "toast",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToast: (state, action) => {
      //   push action payload into toast and then after 1 second remove it
      state.push(action.payload);
      return state;
    },
    removeToast: (state, action) => {
      //   push action payload into toast and then after 1 second remove it
      const newState = state.filter((s) => s.id !== action.payload);
      return newState;
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;

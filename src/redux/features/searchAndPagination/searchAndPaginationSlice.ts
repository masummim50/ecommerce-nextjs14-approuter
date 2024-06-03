import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { productType } from "@/app/interfaces/productInterface";

// Define a type for the slice state
export interface searchType {
  searchTime: { prev: number | null; curr: number | null };
  pageTime: { prev: number | null; curr: number | null };
}

// type productState = {

// Define the initial state using that type
const initialState: searchType = {
  searchTime: {
    prev: 1,
    curr: 0,
  },
  pageTime: {
    prev: 1,
    curr: 0,
  },
};

export const searchAndPaginationSlice = createSlice({
  name: "searchAndPagination",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    searchEnded: (state, action) => {
      state.searchTime.curr = action.payload;
      return state;
    },
    searchStarted: (state, action) => {
      state.searchTime.prev = state.searchTime.curr;
      return state;
    },
    pageClickStarted: (state, action) => {
      state.pageTime.prev = state.pageTime.curr;
      return state;
    },
    pageClickEnded: (state, action) => {
      state.pageTime.curr = action.payload;
      return state;
    },
  },
});

export const { searchEnded, searchStarted } = searchAndPaginationSlice.actions;

export default searchAndPaginationSlice.reducer;

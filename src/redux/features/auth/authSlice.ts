import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Define a type for the slice state
interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    removeUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user.role;
export const selectToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;

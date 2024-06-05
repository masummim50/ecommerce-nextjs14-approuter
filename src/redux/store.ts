import { configureStore } from "@reduxjs/toolkit";
// ...
import authReducer from "@/redux/features/auth/authSlice";
import productReducer from "@/redux/features/product/productSlice";
import { apiSlice } from "./features/api/apiSlice";
import prevSearchAndPaginationReducer from "@/redux/features/searchAndPagination/searchAndPaginationSlice";
import toastReducer from "@/redux/features/toast/toastSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
    prevSearchAndPagination: prevSearchAndPaginationReducer,
    toasts: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

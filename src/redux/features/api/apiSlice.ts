// Need to use the React-specific entry point to import createApi
import { RootState } from "@/redux/store";
import { baseUrl } from "@/shared/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCookies } from "react-cookie";
import { cookies } from "next/headers";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      let token;
      token = (getState() as RootState).auth.accessToken;
      console.log("preparing headers: ", token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

import { apiSlice } from "../api/apiSlice";

interface storeType {
  name: string;
  address: string;
  description: string;
}

const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation({
      query: (data: storeType) => ({
        url: "seller/createstore",
        body: data,
        method: "POST",
      }),
    }),
    getStore: builder.query({
      query: () => ({
        url: "seller/store",
        method: "GET",
      }),
    }),
  }),
});

export default sellerApi.reducer;
export const { useCreateStoreMutation, useGetStoreQuery } = sellerApi;

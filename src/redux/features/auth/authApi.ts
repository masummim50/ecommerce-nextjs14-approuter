import { apiSlice } from "../api/apiSlice";

interface signInDataType {
  email: string;
  password: string;
}
interface signupDataType extends signInDataType {
  name: string;
}
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data: signupDataType) => ({
        url: "auth/user/signup",
        body: data,
        method: "POST",
      }),
    }),
    userSignIn: builder.mutation({
      query: (data: signInDataType) => ({
        url: "auth/user/signin",
        body: data,
        method: "POST",
      }),
    }),
    sellerSignUp: builder.mutation({
      query: (data: signupDataType) => ({
        url: "auth/seller/signup",
        body: data,
        method: "POST",
      }),
    }),
    sellerSignIn: builder.mutation({
      query: (data: signInDataType) => ({
        url: "auth/seller/signin",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export default authApi.reducer;
export const {
  useUserSignInMutation,
  useUserSignUpMutation,
  useSellerSignInMutation,
  useSellerSignUpMutation,
} = authApi;

import { api } from "./api";

export const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

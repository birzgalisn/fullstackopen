import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({ url: "users" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Users", id })),
        { type: "Users", id: "LIST" },
      ],
    }),
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: (_user, _err, id) => [{ type: "Users", id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApi;

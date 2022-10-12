import { api } from "./api";

export const blogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => ({ url: "blogs" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Blogs", id })),
        { type: "Blogs", id: "LIST" },
      ],
    }),
    getBlog: build.query({
      query: (id) => `blogs/${id}`,
      providesTags: (_blog, _err, id) => [{ type: "Blogs", id }],
    }),
    addBlog: build.mutation({
      query: (body) => ({
        url: "blogs",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),
    addComment: build.mutation({
      query: (data) => {
        const { blog, ...body } = data;
        return {
          url: `blogs/${blog}/comments`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (comment) => [{ type: "Blogs", id: comment?.blog }],
    }),
    updateBlog: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `blogs/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (blog) => [{ type: "Blogs", id: blog?.id }],
    }),
    deleteBlog: build.mutation({
      query(id) {
        return {
          url: `blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (blog) => [{ type: "Blogs", id: blog?.id }],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useAddCommentMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;

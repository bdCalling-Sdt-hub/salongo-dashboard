import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/categories/all",
        };
      },
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/categories/category",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useAllCategoriesQuery, useAddCategoryMutation } = categorySlice;

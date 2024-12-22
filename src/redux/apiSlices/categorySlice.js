import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/categories/",
        };
      },
    }),
  }),
});

export const { useAllCategoriesQuery } = categorySlice;

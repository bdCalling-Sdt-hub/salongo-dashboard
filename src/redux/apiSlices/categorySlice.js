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
    allSubCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/categories/sub-categories",
        };
      },
      providesTags: ["Category"],
    }),

    // Sub Sub Category
    allSubSubCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/categories/sub-sub-categories",
        };
      },
      providesTags: ["Category"],
    }),
    addSubSubCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/categories/sub-sub-category",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateSubSubCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/categories/sub-sub-category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteSubSubCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/categories/sub-sub-category/${id}`,
        };
      },
      invalidatesTags: ["Category"],
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

export const {
  useAllCategoriesQuery,
  useAllSubCategoriesQuery,
  useAllSubSubCategoriesQuery,
  useAddSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
  useAddCategoryMutation,
} = categorySlice;

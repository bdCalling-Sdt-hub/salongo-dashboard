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

    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/categories/category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/categories/category/${id}`,
        };
      },
      invalidatesTags: ["Category"],
    }),

    //sub-category
    allSubCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/categories/admin/sub-categories",
        };
      },
      providesTags: ["Category"],
    }),

    addSubCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/categories/sub-category",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/categories/sub-category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/categories/sub-category/${id}`,
        };
      },
      invalidatesTags: ["Category"],
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
        console.log("in slice", data);
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
  }),
});

export const {
  useAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  //sub-category
  useAllSubCategoriesQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,

  //sub-sub-category
  useAllSubSubCategoriesQuery,
  useAddSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
} = categorySlice;

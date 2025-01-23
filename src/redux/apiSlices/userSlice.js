import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    customers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/all-customer",
        };
      },
    }),
    professionals: builder.query({
      query: (params) => {
        return {
          method: "GET",
          url: `/dashboard/all-professional?isFreelancer=${params}`,
        };
      },
    }),
    userById: builder.query({
      query: ({ role, id }) => {
        console.log("slice", role, id);
        return {
          method: "GET",
          url: `/${role}/${id}`,
        };
      },
    }),

    restrictUser: builder.mutation({
      query: (id) => {
        return {
          method: "PATCH",
          url: `/user/restrict/${id}`,
        };
      },
    }),

    adminApprove: builder.mutation({
      query: (id) => {
        return {
          method: "PATCH",
          url: `/user/approve/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useCustomersQuery,
  useProfessionalsQuery,
  useUserByIdQuery,
  useRestrictUserMutation,
  useAdminApproveMutation,
} = userSlice;
